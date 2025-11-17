import { IsIn, IsOptional } from "class-validator";
import { Prisma } from "generated/prisma";
import { BaseQueryDto } from "src/common/dtos/common.dto";

export class UserQueryDto extends BaseQueryDto {
	@IsOptional()
	@IsIn(Object.values(Prisma.UserScalarFieldEnum))
	sortBy?: string;

	@IsOptional()
	@IsIn(Object.values(Prisma.UserScalarFieldEnum))
	searchBy?: string;
}
