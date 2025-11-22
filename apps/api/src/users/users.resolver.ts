import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UserService } from "./users.service";
import { User } from "./entities/user.entity";
import { CreateUserInput } from "./dto/create-user.input";

@Resolver()
export class UserResolver {
	constructor(private readonly userService: UserService) {}

	@Mutation(() => User)
	createUser(@Args("createUserInput") createUserInput: CreateUserInput) {
		return this.userService.create(createUserInput);
	}

	@Query(() => [User], { name: "users" })
	findAll() {
		return this.userService.findAll();
	}

	@Query(() => User, { name: "user" })
	findOne(@Args("id", { type: () => String }) id: string) {
		return this.userService.findOne(id);
	}

	@Mutation(() => User)
	updateUser(@Args("updateUserInput") updateUserInput: CreateUserInput) {
		return this.userService.update(updateUserInput.uid, updateUserInput);
	}

	@Mutation(() => User)
	removeUser(@Args("id", { type: () => Int }) id: string) {
		return this.userService.remove(id);
	}
}
