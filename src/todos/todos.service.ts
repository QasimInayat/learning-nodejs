import { Injectable } from '@nestjs/common';
import type { Todo } from './todo.model';

@Injectable()
export class TodosService {
    private todos: Todo[] = [];
    private id = 1;

    findAll(): Todo[] {
        return this.todos;
    }

    findOne(id: number): Todo | undefined {
        return this.todos.find(todo => todo.id === id);
    }

    create(title: string): Todo {
        const todo = { id: this.id++, title, completed: false };
        this.todos.push(todo);
        return todo;
    }

    update(id: number, updates: Partial<Todo>): Todo | undefined {
        const todo = this.findOne(id);
        if (!todo) return undefined;
        Object.assign(todo, updates);
        return todo;
    }

    remove(id: number): boolean {
        const index = this.todos.findIndex(todo => todo.id === id);
        if (index === -1) return false;
        this.todos.splice(index, 1);
        return true;
    }
}
