import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo, TodoDocument } from './schemas/todo.schema';

@Injectable()
export class TodosService {
    constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) { }

    async findAll(): Promise<Todo[]> {
        return this.todoModel.find().exec();
    }

    async findOne(id: string): Promise<Todo> {
        const todo = await this.todoModel.findById(id).exec();
        if (!todo) throw new NotFoundException('Todo not found');
        return todo;
    }

    async create(title: string): Promise<Todo> {
        const newTodo = new this.todoModel({ title });
        return newTodo.save();
    }

    async update(id: string, updates: Partial<Todo>): Promise<Todo> {
        const todo = await this.todoModel.findByIdAndUpdate(id, updates, { new: true }).exec();
        if (!todo) throw new NotFoundException('Todo not found');
        return todo;
    }

    async remove(id: string): Promise<void> {
        const result = await this.todoModel.findByIdAndDelete(id).exec();
        if (!result) throw new NotFoundException('Todo not found');
    }
}
