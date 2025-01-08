// Importing required modules
import path from "path"; // Utility for handling and transforming file paths
import fs from "fs"; // File system module for reading and writing files

// Defining the structure of the server information using an interface
export interface IServerInfo {
    port: number; // The port number on which the server listens
    name: string; // The name of the server/application
    version: string; // The version of the server/application
    server: { 
        host: string; // The hostname of the server
        port: number; // The port number of the server
    };
}

// Declaring a variable to hold the parsed server information
export let serverInfo: IServerInfo;

// Reading the raw JSON file containing server information
const rawInfo: string = fs.readFileSync(
    path.join(__dirname, "../server/serverInfo.json"), // Path to the JSON file
    'utf8' // Specifies the encoding format for reading the file
);

// Parsing the raw JSON data and assigning it to `serverInfo`
serverInfo = JSON.parse(rawInfo);
