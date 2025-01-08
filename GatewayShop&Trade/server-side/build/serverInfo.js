"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverInfo = void 0;
// Importing required modules
const path_1 = __importDefault(require("path")); // Utility for handling and transforming file paths
const fs_1 = __importDefault(require("fs")); // File system module for reading and writing files
// Reading the raw JSON file containing server information
const rawInfo = fs_1.default.readFileSync(path_1.default.join(__dirname, "../server/serverInfo.json"), // Path to the JSON file
'utf8' // Specifies the encoding format for reading the file
);
// Parsing the raw JSON data and assigning it to `serverInfo`
exports.serverInfo = JSON.parse(rawInfo);
