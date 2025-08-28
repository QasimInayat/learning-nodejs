import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { TodosService } from './todos.service';
import type { Todo } from './todo.model';


@Controller('todos')
export class TodosController {
    constructor(private readonly todosService: TodosService) { }

    @Get()
    findAll(): Todo[] {
        return this.todosService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Todo | undefined {
        return this.todosService.findOne(Number(id));
    }

    @Post()
    create(@Body('title') title: string): Todo {
        return this.todosService.create(title);
    }

    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() updates: { title?: string; completed?: boolean }
    ): Todo | undefined {
        return this.todosService.update(Number(id), updates);
    }

    @Delete(':id')
    remove(@Param('id') id: string): { message: string } {
        const success = this.todosService.remove(Number(id));
        return success ? { message: 'Todo deleted' } : { message: 'Not found' };
    }

}
