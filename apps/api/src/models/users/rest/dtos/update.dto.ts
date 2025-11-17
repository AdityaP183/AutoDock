import { PartialType } from "@nestjs/swagger";
import { CreateUser } from "./create.dto";
import { User } from "generated/prisma";

export class UpdateUser extends PartialType(CreateUser) {
	id: User["id"];
}
