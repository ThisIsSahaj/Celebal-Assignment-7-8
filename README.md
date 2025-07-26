## In Root
- npm init
- npm i express mongoose dotenv
- npm i nodemon

# 👾 HANDLING BACKEND ERRORS

## Error Type 1 - Error Handler
- /utils/errorhandler.js
- /middleware/error.js
- /app.js - import error middleware

## Error Type 2 - Async Error Handler
- we have to write try catch block to handle async errors
- so we will create it once in middleware and then use it
- /middleware/catchAsyncErrors.js
- import in productController.js

## Error Type 3 - Unhandled Promise Rejection
- if we get an error in API URL like mongoDb
- go to `server.js` and handle it at the `BOTTOM`

## Error Type 4 - Handling Uncaught Exception
- if we use something like` console.log(youtube)`
we will get error - ReferenceError: youtube is not defined

- to handle this, go to `server.js` and handle it at the `TOP`

## Error Type 5 - Cast Error - MongoDB Error   
- occurs when we pass product id with less no. of characters
- go to `error.js`


# 🔍 Adding Search, Filter & Pagination to backend
- create utils/apifeatures.js
- import in productController.js
- add  `app.set('query parser', 'extended');` in `app.js` It configures Express to use the advanced 'qs' library for parsing URLs, which understands nested objects

# 🔒 Backend User & Password Authentication
