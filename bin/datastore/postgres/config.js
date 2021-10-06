"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = void 0;
require("reflect-metadata");
var todos_1 = require("../../models/todos");
var typeOrmConfig = {
    type: "postgres",
    host: "postgres",
    port: 5432,
    username: "admin",
    password: "codex",
    database: "todos",
    synchronize: true,
    logging: false,
    entities: [todos_1.TodoItem],
    migrations: [],
};
exports.typeOrmConfig = typeOrmConfig;
