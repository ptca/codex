import "reflect-metadata";

import { TodoItem } from "../../models/todos";
import { Datastore } from "../datastore";
import { createConnection, getManager } from "typeorm";
import { typeOrmConfig } from "./config";

class Postgres implements Datastore {
  init() {}
  getTodos(): Promise<TodoItem[]> {
    return (async () => {
      const conn = await createConnection(typeOrmConfig);
      const todoRepo = conn.getRepository(TodoItem);
      const todos = await todoRepo.find();
      await conn.close();
      return todos;
    })();
  }
  createTodo(todo: TodoItem): Promise<TodoItem> {
    return (async () => {
      const conn = await createConnection(typeOrmConfig);
      const todoRepo = conn.getRepository(TodoItem);
      todo = await todoRepo.save(todo);
      await conn.close();
      return todo;
    })();
  }
  getTodo(id: number): Promise<TodoItem> {
    return (async () => {
      let todo = new TodoItem();
      const conn = await createConnection(typeOrmConfig);
      const todoRepo = conn.getRepository(TodoItem);
      const res = await todoRepo.findOne(id);
      await conn.close();
      if (res) {
        todo = res;
      }
      return todo;
    })();
  }
  updateTodo(todo: TodoItem): Promise<TodoItem> {
    return (async () => {
      const conn = await createConnection(typeOrmConfig);
      const todoRepo = conn.getRepository(TodoItem);
      let res = await todoRepo.findOne(todo.id);
      if (res) {
        res.task = todo.task;
        res.done = todo.done;
        todo = await todoRepo.save(res);
      } else {
        todo = await todoRepo.save(todo);
      }
      await conn.close();
      return todo;
    })();
  }
  deleteTodo(id: number): Promise<TodoItem> {
    return (async () => {
      let todo = new TodoItem();
      const conn = await createConnection(typeOrmConfig);
      const todoRepo = conn.getRepository(TodoItem);
      let res = await todoRepo.findOne(id); // re-assign to know assigned ids
      if (res) {
        await todoRepo.remove(res); // re-assign to know assigned ids
        todo = res;
      }
      await conn.close();
      return todo;
    })();
  }
}

export { Postgres };
