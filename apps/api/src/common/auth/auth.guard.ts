import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable,
	UnauthorizedException,
} from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { JwtService } from "@nestjs/jwt";
import { Reflector } from "@nestjs/core";
import { Role } from "src/common/types";
import { PrismaService } from "src/common/prisma/prisma.service";

export interface AuthenticatedRequest extends Request {
	user?: {
		uid: string;
		roles?: Role[];
	} & Record<string, unknown>;
}

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private readonly jwtService: JwtService,
		private readonly reflector: Reflector,
		private readonly prisma: PrismaService,
	) {}
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const gqlCtx = GqlExecutionContext.create(context);
		const req = gqlCtx.getContext<{ req: AuthenticatedRequest }>().req;

		await this.authenticateUser(req);
		return this.authorizeUser(req, context);
	}

	private async authenticateUser(req: AuthenticatedRequest): Promise<void> {
		const authHeader = req.headers?.get?.("authorization");

		if (typeof authHeader !== "string") {
			throw new UnauthorizedException("No token provided.");
		}

		const parts = authHeader.split(" ");
		const token = parts[1];

		if (!token) {
			throw new UnauthorizedException(
				"Invalid authorization header format.",
			);
		}

		try {
			const payload = await this.jwtService.verifyAsync<{ uid: string }>(
				token,
			);
			req.user = payload;
		} catch {
			throw new UnauthorizedException("Invalid token.");
		}
	}

	private async authorizeUser(
		req: AuthenticatedRequest,
		context: ExecutionContext,
	): Promise<boolean> {
		if (!req.user || !req.user.uid) {
			throw new UnauthorizedException("User not authenticated.");
		}

		const roles = await this.getUserRoles(req.user.uid);
		req.user.roles = roles;

		const requiredRoles = this.getMetadata<Role[]>("roles", context);

		if (!requiredRoles || requiredRoles.length === 0) {
			return true;
		}

		const allowed = requiredRoles.some((role) => roles.includes(role));

		if (!allowed) throw new ForbiddenException("Insufficient permissions.");

		return true;
	}

	private getMetadata<T>(key: string, context: ExecutionContext): T {
		return this.reflector.getAllAndOverride<T>(key, [
			context.getHandler(),
			context.getClass(),
		]);
	}

	private async getUserRoles(uid: string): Promise<Role[]> {
		const rolePromises = [this.prisma.admin.findUnique({ where: { uid } })];

		const roles: Role[] = [];

		const [admin] = await Promise.all(rolePromises);

		if (admin) {
			roles.push("admin");
		}

		return roles;
	}
}
