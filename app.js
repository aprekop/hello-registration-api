"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata"); // this shim is required
var routing_controllers_1 = require("routing-controllers");
var AppController_1 = require("./AppController");
// creates express app, registers all controller routes and returns you express app instance
var app = routing_controllers_1.createExpressServer({
    cors: {
        origin: '*'
    },
    controllers: [AppController_1.AppController] // we specify controllers we want to use
});
// run express application on port 3000
app.listen(3000);
//# sourceMappingURL=app.js.map