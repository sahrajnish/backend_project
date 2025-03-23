import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { FILE_LIMIT } from "./constants.js";

const app = express();

/*
    Enable CORS to allow requests from a specific frontend domain
    `origin: process.env.CORS_ORIGIN` specifies which domains can access the backend
    `credentials: true` allows the browser to send cookies and authentication headers to backend 
    This is required when handling user sessions or authentication in cross-origin requests
*/ 
app.use(cors({
    origin: process.env.CORS_ORIGIN, // Allowed frontend origin
    credentials: true // Enables cookies and authentication headers

}))

/*
    Middleware to parse incoming JSON requests whether from frontend or from else.
    Why Set a Limit? --->
    Security: Prevents Denial of Service (DoS) attacks where an attacker sends very large JSON payloads, overloading the server.
    Performance: Avoids excessive memory usage by restricting payload size
*/
app.use(express.json({
    limit: FILE_LIMIT // json file limit 16kb
}))

// Middleware to parse URL-encoded form data from incoming requests
// This allows the backend to read data sent via HTML forms or URL-encoded requests
// `extended: true` enables parsing of nested objects (complex data structures)
app.use(express.urlencoded({
    extended: true,
    limit: FILE_LIMIT
}))

// Middleware to serve static files (HTML, CSS, JS, images, etc.) from the "public" folder
// This allows the frontend to directly access these files without defining explicit routes
app.use(express.static("public"))

// Middleware to parse cookies from incoming requests
// Used for authentication, session management, and storing user preferences
// Example Use Case:
// 1. User logs in → Backend sets a session ID in cookies.
// 2. Browser automatically includes cookies in subsequent requests.
// 3. Backend reads cookies using cookieParser() to verify authentication status.
//    - If session is valid → Return user-specific data.
//    - If session is invalid → Return generic data or request re-login.
app.use(cookieParser())

// routes import
import userRouter from "./routes/user.routes.js";

app.use("/api/v1/users", userRouter);

export default app;