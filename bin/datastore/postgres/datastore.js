"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Postgres = void 0;
require("reflect-metadata");
var todos_1 = require("../../models/todos");
var typeorm_1 = require("typeorm");
var config_1 = require("./config");
var Postgres = /** @class */ (function () {
    function Postgres() {
    }
    Postgres.prototype.init = function () { };
    Postgres.prototype.getTodos = function () {
        var _this = this;
        return (function () { return __awaiter(_this, void 0, void 0, function () {
            var conn, todoRepo, todos;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, typeorm_1.createConnection)(config_1.typeOrmConfig)];
                    case 1:
                        conn = _a.sent();
                        todoRepo = conn.getRepository(todos_1.TodoItem);
                        return [4 /*yield*/, todoRepo.find()];
                    case 2:
                        todos = _a.sent();
                        return [4 /*yield*/, conn.close()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, todos];
                }
            });
        }); })();
    };
    Postgres.prototype.createTodo = function (todo) {
        var _this = this;
        return (function () { return __awaiter(_this, void 0, void 0, function () {
            var conn, todoRepo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, typeorm_1.createConnection)(config_1.typeOrmConfig)];
                    case 1:
                        conn = _a.sent();
                        todoRepo = conn.getRepository(todos_1.TodoItem);
                        return [4 /*yield*/, todoRepo.save(todo)];
                    case 2:
                        todo = _a.sent();
                        return [4 /*yield*/, conn.close()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, todo];
                }
            });
        }); })();
    };
    Postgres.prototype.getTodo = function (id) {
        var _this = this;
        return (function () { return __awaiter(_this, void 0, void 0, function () {
            var todo, conn, todoRepo, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        todo = new todos_1.TodoItem();
                        return [4 /*yield*/, (0, typeorm_1.createConnection)(config_1.typeOrmConfig)];
                    case 1:
                        conn = _a.sent();
                        todoRepo = conn.getRepository(todos_1.TodoItem);
                        return [4 /*yield*/, todoRepo.findOne(id)];
                    case 2:
                        res = _a.sent();
                        return [4 /*yield*/, conn.close()];
                    case 3:
                        _a.sent();
                        if (res) {
                            todo = res;
                        }
                        return [2 /*return*/, todo];
                }
            });
        }); })();
    };
    Postgres.prototype.updateTodo = function (todo) {
        var _this = this;
        return (function () { return __awaiter(_this, void 0, void 0, function () {
            var conn, todoRepo, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, typeorm_1.createConnection)(config_1.typeOrmConfig)];
                    case 1:
                        conn = _a.sent();
                        todoRepo = conn.getRepository(todos_1.TodoItem);
                        return [4 /*yield*/, todoRepo.findOne(todo.id)];
                    case 2:
                        res = _a.sent();
                        if (!res) return [3 /*break*/, 4];
                        res.task = todo.task;
                        res.done = todo.done;
                        return [4 /*yield*/, todoRepo.save(res)];
                    case 3:
                        todo = _a.sent();
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, todoRepo.save(todo)];
                    case 5:
                        todo = _a.sent();
                        _a.label = 6;
                    case 6: return [4 /*yield*/, conn.close()];
                    case 7:
                        _a.sent();
                        return [2 /*return*/, todo];
                }
            });
        }); })();
    };
    Postgres.prototype.deleteTodo = function (id) {
        var _this = this;
        return (function () { return __awaiter(_this, void 0, void 0, function () {
            var todo, conn, todoRepo, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        todo = new todos_1.TodoItem();
                        return [4 /*yield*/, (0, typeorm_1.createConnection)(config_1.typeOrmConfig)];
                    case 1:
                        conn = _a.sent();
                        todoRepo = conn.getRepository(todos_1.TodoItem);
                        return [4 /*yield*/, todoRepo.findOne(id)];
                    case 2:
                        res = _a.sent();
                        if (!res) return [3 /*break*/, 4];
                        return [4 /*yield*/, todoRepo.remove(res)];
                    case 3:
                        _a.sent(); // re-assign to know assigned ids
                        todo = res;
                        _a.label = 4;
                    case 4: return [4 /*yield*/, conn.close()];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, todo];
                }
            });
        }); })();
    };
    return Postgres;
}());
exports.Postgres = Postgres;
