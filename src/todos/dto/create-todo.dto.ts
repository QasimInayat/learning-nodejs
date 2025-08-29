import { IsString, MinLength } from 'class-validator';

export class CreateTodoDto {
    @IsString({ message: 'Title must be a string' })
    @MinLength(3, { message: 'Title must be at least 3 characters long' })
    title: string;
}