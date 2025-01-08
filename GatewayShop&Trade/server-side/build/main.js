"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importing required modules
const express_1 = __importDefault(require("express")); // Express framework and TypeScript types
const path_1 = __importDefault(require("path")); // Provides utilities for working with file and directory paths
const serverInfo_1 = require("./serverInfo"); // Importing server configuration (e.g., port and host)
const routes_1 = __importDefault(require("./routes")); // Importing API routes
// Creating an instance of the Express application
const app = (0, express_1.default)();
// Middleware to parse incoming JSON requests
app.use(express_1.default.json());
// Path to the client-side build directory
const clientBuildPath = path_1.default.join(__dirname, "../../client-side/dist");
// Serving static files from the client build directory
app.use(express_1.default.static(clientBuildPath));
// Middleware to set CORS headers
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // Allows requests from any origin
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Specifies allowed HTTP methods
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); // Specifies allowed headers
    next(); // Passes control to the next middleware
});
// Registering API routes under the `/api` path
app.use('/api', routes_1.default);
// Catch-all route to serve the client-side `index.html` for any non-API request
app.get("*", (req, res) => {
    res.sendFile(path_1.default.resolve(clientBuildPath, "index.html")); // Resolves the path to the client-side index.html
});
// Starting the server on the specified port
const port = serverInfo_1.serverInfo.port || 8080; // Fallback to 8080 if no port is specified in `serverInfo`
app.listen(port, () => {
    console.log(`Server running on http://127.0.0.1:${port}/`); // Logs the server URL to the console
});
