import * as http from "node:http";

import { connectNodeAdapter } from "@connectrpc/connect-node";

import routes from "./router";

http.createServer(connectNodeAdapter({ routes })).listen(50051, "0.0.0.0");
console.log("Server running at http://0.0.0.0:50051/");
