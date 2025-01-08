// Importing the `User` interface for type safety
import { User } from './interfaces';

// Importing the `usersDB` datastore for user-related database operations
import { usersDB } from './datastores';

// Importing bcrypt for password hashing and salting
import bcrypt from 'bcrypt';

/**
 * Adds a new user to the database.
 *
 * @param user - The user object to be added, including username, password, and other details.
 * @returns A promise that resolves with the newly created user or rejects with an error.
 */
export const addUser = (user: User): Promise<User> => {
    return new Promise(async (resolve, reject) => {
        try {
            // Generating a salt for password hashing
            const salt = await bcrypt.genSalt(10);
            
            // Hashing the user's password with the generated salt
            user.password = await bcrypt.hash(user.password, salt);
            
            // Inserting the new user into the database
            usersDB.insert(user, (err: Error | null, newUser: User) => {
                if (err) {
                    reject(err); // Rejects the promise if there's an error
                } else {
                    resolve(newUser); // Resolves the promise with the newly added user
                }
            });
        } catch (error) {
            reject(error); // Rejects the promise if there's an error during hashing or database interaction
        }
    });
};