import "reflect-metadata";

import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

import { TodoItem } from "../../models/todos";

const typeOrmConfig: PostgresConnectionOptions = {
  type: "postgres",
  host: "postgres",
  port: 5432,
  username: "admin",
  password: "codex",
  database: "todos",
  synchronize: true,
  logging: false,
  entities: [TodoItem],
  migrations: [],
};

export { typeOrmConfig };
