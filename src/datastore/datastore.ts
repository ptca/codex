import { TodoItem } from "../models/todos";

interface Datastore {
  init(): void;
  getTodos(): Promise<TodoItem[]>;
  createTodo(todo: TodoItem): Promise<TodoItem>;
  updateTodo(todo: TodoItem): Promise<TodoItem>;
  deleteTodo(id: number): Promise<TodoItem>;
  getTodo(id: number): Promise<TodoItem>;
}

export { Datastore };
