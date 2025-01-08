// Importing required modules
const path = require('path'); // Provides utilities for working with file and directory paths
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Simplifies the creation of HTML files
const WorkboxWebpackPlugin = require('workbox-webpack-plugin'); // Adds support for Progressive Web Apps (PWAs)

// Checking the current environment (production or development)
const isProduction = process.env.NODE_ENV == 'production';

// Defining the handler for styling files
const stylesHandler = 'style-loader'; // Injects styles into the DOM

// Webpack configuration object
const config = {
    // Entry point for the application
    entry: "./src/code/main.tsx", // Main TypeScript file where the application starts

    // Output configuration for the compiled files
    output: {
        path: path.resolve(__dirname, 'dist'), // Directory where compiled files will be output
    },

    // Development server configuration
    devServer: {
        open: true, // Automatically opens the browser
        host: 'localhost', // Hostname for the server
        port: 3000, // Port for the development server
        proxy: [
            {
                context: ['/api'], // Routes to be proxied
                target: 'http://localhost:8080', // Backend server URL
                changeOrigin: true, // Ensures the origin of the host header matches the target URL
            },
        ],
    },

    // Plugins configuration
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html", // Template file for the HTML
            filename: "./index.html", // Output file name
        }),
    ],

    // Module rules for processing different file types
    module: {
        rules: [
            {
                test: /\.html$/, // Matches HTML files
                use: { loader: "html-loader" }, // Processes HTML files
            },
            {
                test: /\.(ts|tsx)$/i, // Matches TypeScript and TSX files
                loader: 'ts-loader', // Transpiles TypeScript to JavaScript
                exclude: ['/node_modules/'], // Excludes node_modules directory
            },
            {
                test: /\.css$/i, // Matches CSS files
                use: [stylesHandler, 'css-loader', 'postcss-loader'], // Processes CSS files and applies PostCSS plugins
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i, // Matches asset files (fonts, images, etc.)
                type: 'asset', // Handles assets using Webpack's asset modules
            },
        ],
    },

    // Resolves extensions and provides fallbacks for certain Node.js modules
    resolve: {
        extensions: [".tsx", ".ts", ".jsx", ".js", "..."], // File extensions Webpack will resolve
        fallback: { 
            "http": false, 
            "browser": false, 
            "https": false, 
            "zlib": false, 
            "stream": false, 
            "url": false, 
            "buffer": false, 
            "timers": false, 
            "assert": false, 
            "axios": false 
        }, // Disables certain Node.js core module polyfills
    },
};

// Module export based on the environment
module.exports = () => {
    if (isProduction) {
        config.mode = 'production'; // Sets the mode to production for optimized builds
        config.plugins.push(new WorkboxWebpackPlugin.GenerateSW()); // Adds service worker for PWAs
    } else {
        config.mode = 'development'; // Sets the mode to development for faster builds and better debugging
    }
    return config;
};
