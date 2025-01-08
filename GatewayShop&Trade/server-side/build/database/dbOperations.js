"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUser = void 0;
// Importing the `usersDB` datastore for user-related database operations
const datastores_1 = require("./datastores");
// Importing bcrypt for password hashing and salting
const bcrypt_1 = __importDefault(require("bcrypt"));
/**
 * Adds a new user to the database.
 *
 * @param user - The user object to be added, including username, password, and other details.
 * @returns A promise that resolves with the newly created user or rejects with an error.
 */
const addUser = (user) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Generating a salt for password hashing
            const salt = yield bcrypt_1.default.genSalt(10);
            // Hashing the user's password with the generated salt
            user.password = yield bcrypt_1.default.hash(user.password, salt);
            // Inserting the new user into the database
            datastores_1.usersDB.insert(user, (err, newUser) => {
                if (err) {
                    reject(err); // Rejects the promise if there's an error
                }
                else {
                    resolve(newUser); // Resolves the promise with the newly added user
                }
            });
        }
        catch (error) {
            reject(error); // Rejects the promise if there's an error during hashing or database interaction
        }
    }));
};
exports.addUser = addUser;
