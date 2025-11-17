import { IsOptional } from "class-validator";
import { User } from "generated/prisma";
import { RestrictProperties } from "src/common/dtos/common.input";

export class UserEntity implements RestrictProperties<UserEntity, User> {
	uid: string;
	createdAt: Date;
	updatedAt: Date;
	image: string | null;

	@IsOptional()
	name: string;
}
