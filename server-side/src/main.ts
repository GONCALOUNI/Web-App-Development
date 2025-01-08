// Importing required modules
import express, { Express, NextFunction, Request, Response } from "express"; // Express framework and TypeScript types
import path from "path"; // Provides utilities for working with file and directory paths
import { serverInfo } from "./serverInfo"; // Importing server configuration (e.g., port and host)
import routes from './routes'; // Importing API routes

// Creating an instance of the Express application
const app: Express = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Path to the client-side build directory
const clientBuildPath = path.join(__dirname, "../../client-side/dist");

// Serving static files from the client build directory
app.use(express.static(clientBuildPath));

// Middleware to set CORS headers
app.use((req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*"); // Allows requests from any origin
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Specifies allowed HTTP methods
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); // Specifies allowed headers
    next(); // Passes control to the next middleware
});

// Registering API routes under the `/api` path
app.use('/api', routes);

// Catch-all route to serve the client-side `index.html` for any non-API request
app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.resolve(clientBuildPath, "index.html")); // Resolves the path to the client-side index.html
});

// Starting the server on the specified port
const port = serverInfo.port || 8080; // Fallback to 8080 if no port is specified in `serverInfo`
app.listen(port, () => {
    console.log(`Server running on http://127.0.0.1:${port}/`); // Logs the server URL to the console
});