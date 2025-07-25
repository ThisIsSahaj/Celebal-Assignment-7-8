const app = require("./app");

const dotenv = require("dotenv");
const connectDatabase = require("./config/database")

//❗Error Type 4 - Handling Uncaught Exception
process.on("uncaughtException", (err)=> {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting Down the server due to Uncaught Exception`);

    //exit from process
    process.exit(1);
})


//CONFIG
dotenv.config({path:"backend/config/config.env"});
console.log('DB_URI:', process.env.DB_URI);


// Connecting to DB
connectDatabase();



const server = app.listen(process.env.PORT,()=>{
    console.log(`Server is working on http://localhost:${process.env.PORT}`)
});


//❗Error Type 3 - Unhandled Promise Rejection
process.on("unhandledRejection", err=>{
    console.log(`Error ${err.message}`);
    console.log(`Shutting Down the server due to Unhandled Promise Rejection`);

    // Now Close The Server
    server.close(()=>{
        process.exit(1); //exit from the process after server is closed
    });
})