import { TodoItem } from "../../models/todos";
import { Datastore } from "../datastore";

let database: { [key: number]: TodoItem };
let id: number;

class InMem implements Datastore {
  init() {
    database = {};
    id = 0;
  }

  getTodos(): Promise<TodoItem[]> {
    return (async () => {
      return Object.values(database);
    })();
  }

  createTodo(todo: TodoItem): Promise<TodoItem> {
    return (async () => {
      database[id] = todo;
      todo.id = id;
      id++;
      return todo;
    })();
  }
  getTodo(id: number): Promise<TodoItem> {
    return (async () => {
      return database[id];
    })();
  }
  updateTodo(todo: TodoItem): Promise<TodoItem> {
    return (async () => {
      database[todo.id] = todo;
      return todo;
    })();
  }
  deleteTodo(id: number): Promise<TodoItem> {
    return (async () => {
      const res = database[id];
      delete database[id];
      return res;
    })();
  }
}

export { InMem };
