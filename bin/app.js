"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = require("./utils/server");
(0, server_1.createServer)("postgres")
    .then(function (server) {
    server.listen(3000, function () {
        console.info("Listening on http://localhost:3000");
    });
})
    .catch(function (err) {
    console.error("Error: " + err);
});
