import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TodosModule } from './todos/todos.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // loads .env
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/todoapp'),
    TodosModule,
    AuthModule,
  ],
})
export class AppModule { }
