import {
	SetMetadata,
	UseGuards,
	applyDecorators,
	createParamDecorator,
	ExecutionContext,
} from "@nestjs/common";
import { Role } from "src/common/types";

import { AuthenticatedRequest, AuthGuard } from "./auth.guard";
import { GqlExecutionContext } from "@nestjs/graphql";

interface GqlContext {
	req: AuthenticatedRequest;
}

export const AllowAuthenticated = (...roles: Role[]) =>
	applyDecorators(SetMetadata("roles", roles), UseGuards(AuthGuard));

export const GetUser = createParamDecorator(
	(data: unknown, ctx: ExecutionContext) => {
		const gqlCtx = GqlExecutionContext.create(ctx).getContext<GqlContext>();

		return gqlCtx.req.user ?? null;
	},
);
