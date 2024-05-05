import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoListDto } from './dto/create-todo-list.dto';
import { UpdateTodoListDto } from './dto/update-todo-list.dto';
import { readFile, writeFile } from 'fs/promises';
import { v4 } from 'uuid';
import { WebsocketsGateway } from 'src/gatway/websockets.gateway';

@Injectable()
export class TodoListService {
  constructor(private readonly websocketsGateway: WebsocketsGateway) {}

  async create(createTodoListDto: CreateTodoListDto) {
    const todoList = await this.findAll();
    const createTodoList = {
      ...createTodoListDto,
      id: v4(),
      createdAt: new Date(),
      isCompleted: false,
    };
    this.websocketsGateway.server.emit('todo-subscription', createTodoList);
    todoList.push(createTodoList);
    await writeFile('db.json', JSON.stringify({ todoList }), 'utf-8');
    return createTodoList;
  }

  async findAll(): Promise<
    Array<{
      isCompleted: boolean;
      createdAt: Date;
      id: string;
      description: string;
    }>
  > {
    const db = JSON.parse(await readFile('db.json', 'utf-8'));
    return db.todoList;
  }

  async findAllPagination(pageNumber = 1, pageSize = 5) {
    const paginateArray = (array, pageNumber, pageSize) => {
      const startIndex = (pageNumber - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedItems = array.slice(startIndex, endIndex);
      return paginatedItems;
    };

    const todoList = await this.findAll();
    const todoListPagination = paginateArray(todoList, pageNumber, pageSize);
    return {
      pageNumber,
      pageSize,
      data: todoListPagination,
      total: todoList.length,
    };
  }

  async findOne(id: string) {
    const todoList = await this.findAll();
    const todo = todoList.find(({ id: _id }) => _id === id);
    if (!todo) throw new NotFoundException();
    return todo;
  }

  async update(id: string, updateTodoListDto: UpdateTodoListDto) {
    const todoList = await this.findAll();
    const todo = todoList.map((_todo) => {
      if (_todo.id === id) {
        return { ..._todo, ...updateTodoListDto, updatedAt: new Date() };
      }
      return _todo;
    });
    await writeFile('db.json', JSON.stringify({ todoList: todo }), 'utf-8');
    return this.findOne(id);
  }

  async remove(id: string) {
    const todoList = await this.findAll();
    const todo = await this.findOne(id);
    await writeFile(
      'db.json',
      JSON.stringify({
        todoList: todoList.filter(({ id: _id }) => id !== _id),
      }),
      'utf-8',
    );
    return todo;
  }
}
