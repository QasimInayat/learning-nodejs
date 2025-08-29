import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo } from './schemas/todo.schema';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('todos')
@UseGuards(AuthGuard('jwt')) // ✅ protect all routes
export class TodosController {
    constructor(private readonly todosService: TodosService) { }

    @Get()
    async findAll(): Promise<Todo[]> {
        return this.todosService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Todo> {
        return this.todosService.findOne(id);
    }

    @Post()
    async create(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
        return this.todosService.create(createTodoDto.title);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto): Promise<Todo> {
        return this.todosService.update(id, updateTodoDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        await this.todosService.remove(id);
        return { message: 'Todo deleted' };
    }
}
