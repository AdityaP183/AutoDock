import { InputType, PartialType } from "@nestjs/graphql";
import { Prisma } from "generated/prisma";
import { RestrictProperties, StringFilter } from "src/common/dtos/common.input";

@InputType()
export class UserWhereUniqueInput {
	uid: string;
}

@InputType()
export class UserWhereInputStrict
	implements
		RestrictProperties<
			UserWhereInputStrict,
			Omit<
				Prisma.UserWhereInput,
				"Credentials" | "AuthProvider" | "Admin"
			>
		>
{
	uid: StringFilter | Prisma.StringFilter<"User">;
	createdAt: StringFilter | Date | Prisma.DateTimeFilter<"User">;
	updatedAt: StringFilter | Date | Prisma.DateTimeFilter<"User">;
	name: StringFilter | Prisma.StringNullableFilter<"User"> | null;
	image: string | Prisma.StringNullableFilter<"User"> | null;

	AND: UserWhereInput[];
	OR: UserWhereInput[];
	NOT: UserWhereInput[];
}

@InputType()
export class UserWhereInput extends PartialType(UserWhereInputStrict) {}

@InputType()
export class UserListRelationFilter {
	every?: UserWhereInput;
	some?: UserWhereInput;
	none?: UserWhereInput;
}

@InputType()
export class UserRelationFilter {
	is?: UserWhereInput;
	isNot?: UserWhereInput;
}
