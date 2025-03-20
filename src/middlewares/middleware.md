# Middleware
🛡️ **Middleware in Express.js**
    
📌 **Definition:**  
    Middleware functions are functions that execute **before** the actual request reaches the backend logic.
    They are used for tasks like authentication, request validation, logging, and error handling.

📌 **How It Works:**  
    - When a client (frontend) sends a request, middleware **intercepts it first**.
    - Middleware **processes** the request (e.g., checks authentication, parses data).
    - If everything is fine, it calls `next()` to pass the request to the next middleware or route handler.
    - Otherwise, it stops the request and sends an appropriate response.

📌 **Example: Authentication Middleware**  
    - A user tries to place an order without logging in.
    - Middleware checks if they have a valid session (cookie).
    - If **not logged in**, it stops the request and returns: `"Please log in first."`
    - If **logged in**, it allows the request to continue.