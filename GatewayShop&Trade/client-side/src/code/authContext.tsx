// Importing React and hooks for creating and using contexts, managing state, and handling children
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Defining the structure of the authentication context
interface AuthContextType {
  isAuthenticated: boolean; // Tracks whether a user is authenticated
  username: string | null; // Stores the username of the authenticated user
  login: (username: string) => void; // Function to log in a user
  logout: () => void; // Function to log out a user
}

// Creating the authentication context
// The initial value is set to undefined to ensure the context is provided by a parent
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Defining the AuthProvider component
// It wraps its children with the authentication context provider
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // State variables to track authentication status and username
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Tracks if a user is logged in
  const [username, setUsername] = useState<string | null>(null); // Stores the logged-in username

  /**
   * Logs in the user.
   * - Sets authentication status to true.
   * - Updates the username state with the provided username.
   *
   * @param user - The username of the authenticated user
   */
  const login = (user: string) => {
    setIsAuthenticated(true);
    setUsername(user);
  };

  /**
   * Logs out the user.
   * - Sets authentication status to false.
   * - Clears the username state.
   */
  const logout = () => {
    setIsAuthenticated(false);
    setUsername(null);
  };

  // Returning the context provider with the current authentication state and methods
  return (
    <AuthContext.Provider value={{ isAuthenticated, username, login, logout }}>
      {children} {/* Renders the children components wrapped by the provider */}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to consume the AuthContext.
 * - Ensures that the hook is used within an AuthProvider.
 *
 * @returns The current authentication context value.
 * @throws Error if the context is used outside an AuthProvider.
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext); // Accesses the context value
  if (!context) {
    // Throws an error if the context is not provided
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context; // Returns the context value
};