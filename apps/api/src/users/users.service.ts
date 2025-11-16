import { Injectable } from "@nestjs/common";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";
import { PrismaService } from "src/utils/prisma.service";

@Injectable()
export class UsersService {
	constructor(private readonly prisma: PrismaService) {}
	create(createUserInput: CreateUserInput) {
		return this.prisma.user.create({ data: createUserInput });
	}

	findAll() {
		return this.prisma.user.findMany();
	}

	findOne(id: number) {
		return `This action returns a #${id} user`;
	}

	update(id: string, updateUserInput: UpdateUserInput) {
        this.prisma.user.update({ where: { uid: id }, data: updateUserInput });
		return `This action updates a #${id} user`;
	}

	remove(id: number) {
		return `This action removes a #${id} user`;
	}
}
