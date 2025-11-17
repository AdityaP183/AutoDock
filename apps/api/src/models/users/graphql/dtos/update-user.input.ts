import { CreateUserInput } from "./create-user.input";
import { InputType, PartialType } from "@nestjs/graphql";
import { User } from "generated/prisma";

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
	uid: User["uid"];
}
