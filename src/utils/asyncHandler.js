/*
    Higher-Order Function: asyncHandler is a function that takes another function (requestHandler) as an argument 
    and returns a new function.

    Purpose:
    - It wraps an async function (requestHandler) inside a try-catch-like structure.
    - Ensures that if the requestHandler function rejects (throws an error), it is automatically caught and passed to `next(error)`.
    - Prevents the need to write repetitive try-catch blocks in every async route handler.

    Breakdown:
    - `asyncHandler(requestHandler)` → Takes an async function as a parameter.
    - Returns a new function `(req, res, next) => {}` that acts as middleware.
    - Inside this function:
        - `Promise.resolve(requestHandler(req, res, next))`: Executes the requestHandler function.
        - If requestHandler resolves successfully, it proceeds normally.
        - If requestHandler throws an error, `.catch((error) => next(error))` passes the error to Express error-handling middleware.

    Example Usage:
    ```
    app.get("/users", asyncHandler(async (req, res) => {
        const users = await User.find();  // Fetch users from DB
        res.json(users);
    }));
    ```
    - Here, `asyncHandler` ensures that any error occurring inside the async function is automatically handled.
*/
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
            .catch((error) => next(error))
    }
}

export {asyncHandler}