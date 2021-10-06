# Codex Take Home - Peyo Tzolov

## Goals

Write an API, toDoAPI that allows a user to CRUD todo objects.

Assume the following object. (Add additional data where necessary)
ToDo:
task: string
done: boolean

- Use Express.js for the server.
- Use typescript if possible.
- A user should be able to create a todo (no UI needed)
- A user should be able to mark a todo done (no UI needed)
- Use any ORM (We use TypeORM)
- Use any DB (We use Postgres)
- Finally, Dockerize the DB and server

## Approach

I am not an expert in this ecosystem, so my approach may not be in line with standard practice.

_Note_ there is no explicit `done` endpoint. The user can use a `PUT` request to set the `done` to `true` on any given ToDo.

### High level

The main components are:

- swagger file that defines the API
- controller that implements the API handlers
- datastore interface that provides methods for the CRUD operations. I have provided an in-memory, as well as postgres implementation. The default is postgres.

### What's not included

- tests
- significant error handling ( some basic checks are in, but this would need hardening )

## Running

- calling make run will run everything that is needed, this includes:
  - building the docker image
  - spinning up docker compose
  - initializing the database

After calling `make run` you can interact with the API on `localhost:3000`
