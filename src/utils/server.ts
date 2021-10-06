import express from "express";
// import {OpenApiValidator} from 'express-openapi-validator' // if version 3.*
import * as OpenApiValidator from "express-openapi-validator";
import { Express } from "express-serve-static-core";
import { connector, summarise } from "swagger-routes-express";
import YAML from "yamljs";

import * as api from "../api/controllers";
import { Datastore } from "../datastore/datastore";
import { InMem } from "../datastore/inmemory/datastore";
import { Postgres } from "../datastore/postgres/datastore";

var bodyParser = require("body-parser");

let db: Datastore;

export async function createServer(datastore: string): Promise<Express> {
  const yamlSpecFile = "./config/api.yml";
  const apiDefinition = YAML.load(yamlSpecFile);
  const apiSummary = summarise(apiDefinition);
  console.info(apiSummary);

  // use the given database implementation

  switch (datastore) {
    case "inmemory":
      db = new InMem();
      break;

    case "postgres":
      db = new Postgres();
      break;

    default:
      db = new InMem();
      break;
  }

  db.init();

  const server = express();
  server.use(express.json());
  // here we can intialize body/cookies parsers, connect logger, for example morgan

  // setup API validator
  const validatorOptions = {
    coerceTypes: true,
    apiSpec: yamlSpecFile,
    validateRequests: true,
    validateResponses: true,
  };
  //   await new OpenApiValidator(validatorOptions).install(server) // if version 3.*
  server.use(OpenApiValidator.middleware(validatorOptions));

  // error customization, if request is invalid
  server.use(
    (
      err: any,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      res.status(err.status).json({
        error: {
          type: "request_validation",
          message: err.message,
          errors: err.errors,
        },
      });
    }
  );

  const connect = connector(api, apiDefinition, {
    onCreateRoute: (method: string, descriptor: any[]) => {
      console.log(
        `${method}: ${descriptor[0]} : ${(descriptor[1] as any).name}`
      );
    },
  });

  connect(server);

  return server;
}

export { db };
