import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo } from './schemas/todo.schema';

@Controller('todos')
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
    async create(@Body('title') title: string): Promise<Todo> {
        return this.todosService.create(title);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updates: { title?: string; completed?: boolean },
    ): Promise<Todo> {
        return this.todosService.update(id, updates);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        await this.todosService.remove(id);
        return { message: 'Todo deleted' };
    }
}
