import "reflect-metadata"; // this shim is required
import {createExpressServer} from "routing-controllers";
import {AppController} from "./AppController";

// creates express app, registers all controller routes and returns you express app instance
const app = createExpressServer({
    cors: {
        origin: '*'
    },
    controllers: [AppController] // we specify controllers we want to use
});
// run express application on port 3000
app.listen(3000);