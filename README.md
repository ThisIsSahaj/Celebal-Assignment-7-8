## In Root
- npm init
- npm i express mongoose dotenv
- npm i nodemon

# Handle Error 1 - Error Handler
- /utils/errorhandler.js
- /middleware/error.js
- /app.js - import error middleware

# Handle Error 2 - Async Error Handler
- we have to write try catch block to handle async errors
- so we will create it once in middleware and then use it
- /middleware/catchAsyncErrors.js
- import in productController.js

# Handle Error 3 - Unhandled Promise Rejection
- if we get an error in API URL like mongoDb
- go to `server.js` and handle it at the `BOTTOM`

# Handle Error 4 - Handling Uncaught Exception
- if we use something like` console.log(youtube)`
we will get error - ReferenceError: youtube is not defined

- to handle this, go to `server.js` and handle it at the `TOP`


# Handle Error 5 - Cast Error - MongoDB Error   
- occurs when we pass product id with less no. of characters
- go to `error.js`
