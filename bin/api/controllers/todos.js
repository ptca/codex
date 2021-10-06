"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.getTodo = exports.createTodo = exports.getTodos = void 0;
var server_1 = require("../../utils/server");
function getTodos(req, res) {
    server_1.db.getTodos()
        .then(function (todos) {
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
        .catch(function (err) {
        console.error(err);
        res.json({
            code: 500,
            message: "" + err,
        });
    });
}
exports.getTodos = getTodos;
function createTodo(req, res) {
    server_1.db.createTodo(req.body)
        .then(function (todo) {
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
        .catch(function (err) {
        console.error(err);
        res.json({
            code: 500,
            message: "" + err,
        });
    });
}
exports.createTodo = createTodo;
function getTodo(req, res) {
    var id = parseInt(req.params.todoID);
    server_1.db.getTodo(id)
        .then(function (todo) {
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
        .catch(function (err) {
        console.error(err);
        res.json({
            code: 500,
            message: "" + err,
        });
        return;
    });
}
exports.getTodo = getTodo;
function updateTodo(req, res) {
    var id = parseInt(req.params.todoID);
    var todoReq = req.body;
    todoReq.id = id;
    server_1.db.updateTodo(todoReq)
        .then(function (todo) {
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
        .catch(function (err) {
        console.error(err);
        res.json({
            code: 500,
            message: "" + err,
        });
        return;
    });
}
exports.updateTodo = updateTodo;
function deleteTodo(req, res) {
    var id = parseInt(req.params.todoID);
    server_1.db.deleteTodo(id)
        .then(function (todo) {
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
        .catch(function (err) {
        console.error(err);
        res.json({
            code: 500,
            message: "" + err,
        });
        return;
    });
}
exports.deleteTodo = deleteTodo;
