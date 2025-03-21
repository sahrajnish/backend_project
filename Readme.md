# 📌 YouTube Project  

## 🚀 Dependencies  

### 1️⃣ `cookie-parser`  
👉 Helps read and process cookies sent by the browser.  
🔹 Useful for handling user authentication and session management.  

### 2️⃣ `cors` 
👉 Allows frontend (running on a different domain) to access backend APIs.  
🔹 Essential for handling cross-origin requests (e.g., frontend at `www.youtube-clone.com` accessing backend at `api.youtube-clone.com`).  

### 3️⃣ `dotenv` 
👉 Loads environment variables from a `.env` file into the project.  
🔹 Keeps sensitive information (e.g., database URL, API keys) private and secure.  

### 4️⃣ `express` 
👉 The core backend framework for handling HTTP requests and routing.  
🔹 Simplifies building APIs, managing requests, and sending responses.  

### 5️⃣ `mongoose`  
👉 Makes it easier to interact with MongoDB (the database).  
🔹 Allows defining schemas (structured data) and performing database operations easily.  

### 6️⃣ `mongoose-aggregate-paginate-v2`  
👉 Enhances **MongoDB aggregation queries** by adding **pagination** support.  
🔹 Without pagination, fetching large datasets (e.g., **millions of YouTube videos**) could **crash** the system.  
🔹 Supports **filtering, sorting, and paginating** data efficiently.  
🔹 Example: If videos are sorted by views, instead of loading **all** videos, it retrieves **only 10 at a time** per page, keeping the  system fast and responsive. 

### 7️⃣ `bcrypt`  
👉 Used for **hashing passwords** to enhance security.  
🔹 Converts plain-text passwords into **hashed values** before storing them in the database.  
🔹 Prevents attackers from easily accessing user passwords even if the database is compromised.  
🔹 Also provides a way to **compare** hashed passwords during login authentication. 

### 8️⃣ `jsonwebtoken` (JWT) 🔐  
👉 Used for **user authentication and authorization**.  
🔹 Generates **secure tokens** (JWTs) that store user identity and permissions.  
🔹 These tokens are sent to the frontend after login and used in subsequent requests to verify the user's identity.  
🔹 Ensures **stateless authentication**, meaning no need to store session data on the server.  
🔹 Commonly used for **protecting routes** and securing APIs.  