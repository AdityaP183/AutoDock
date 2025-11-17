import { Field, ObjectType } from "@nestjs/graphql";
import { User as UserType } from "generated/prisma";
import { RestrictProperties } from "src/common/dtos/common.input";

@ObjectType()
export class User implements RestrictProperties<User, UserType> {
	uid: string;
	@Field({ nullable: true })
	name: string | null;
	createdAt: Date;
	updatedAt: Date;
	image: string | null;
}
