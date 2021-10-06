import * as express from "express";
import { db } from "../../utils/server";

export function getTodos(req: express.Request, res: express.Response): void {
  db.getTodos()
    .then((todos) => {
      if (!todos || todos.length === 0) {
        res.status(404);
        res.json({
          code: 404,
          message: "No todo items have been created",
        });
        return;
      }

      res.json({
        todos: todos,
      });
    })
    .catch((err) => {
      console.error(err);
      res.json({
        code: 500,
        message: `${err}`,
      });
    });
}

export function createTodo(req: express.Request, res: express.Response): void {
  db.createTodo(req.body)
    .then((todo) => {
      if (!todo) {
        res.status(400);
        res.json({
          code: 404,
          message: "Unable to create todo",
        });
        return;
      }

      res.status(201);
      res.json(todo);
    })
    .catch((err) => {
      console.error(err);
      res.json({
        code: 500,
        message: `${err}`,
      });
    });
}

export function getTodo(req: express.Request, res: express.Response): void {
  const id = parseInt(req.params.todoID);
  db.getTodo(id)
    .then((todo) => {
      if (!todo) {
        res.status(404);
        res.json({
          code: 404,
          message: "Unable to find todo",
        });
        return;
      }

      res.status(200);
      res.json(todo);
    })
    .catch((err) => {
      console.error(err);
      res.json({
        code: 500,
        message: `${err}`,
      });
      return;
    });
}

export function updateTodo(req: express.Request, res: express.Response): void {
  const id = parseInt(req.params.todoID);
  let todoReq = req.body;
  todoReq.id = id;

  db.updateTodo(todoReq)
    .then((todo) => {
      if (!todo) {
        res.status(400);
        res.json({
          code: 404,
          message: "Unable to update todo",
        });
        return;
      }
      res.status(200);
      res.json(todo);
    })
    .catch((err) => {
      console.error(err);
      res.json({
        code: 500,
        message: `${err}`,
      });
      return;
    });
}

export function deleteTodo(req: express.Request, res: express.Response): void {
  const id = parseInt(req.params.todoID);
  db.deleteTodo(id)
    .then((todo) => {
      if (!todo) {
        res.status(404);
        res.json({
          code: 404,
          message: "Unable to find todo",
        });
        return;
      }

      res.status(200);
      res.json(todo);
    })
    .catch((err) => {
      console.error(err);
      res.json({
        code: 500,
        message: `${err}`,
      });
      return;
    });
}
