import { IsOptional, IsString, IsBoolean, MinLength } from 'class-validator';

export class UpdateTodoDto {
    @IsOptional()
    @IsString({ message: 'Title must be a string' })
    @MinLength(3, { message: 'Title must be at least 3 characters long' })
    title?: string;

    @IsOptional()
    @IsBoolean({ message: 'Completed must be true or false' })
    completed?: boolean;
}
