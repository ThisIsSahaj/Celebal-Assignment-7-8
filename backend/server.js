const app = require("./app");

const dotenv = require("dotenv");
const connectDatabase = require("./config/database")

//CONFIG
dotenv.config({path:"backend/config/config.env"});
console.log('DB_URI:', process.env.DB_URI);


// Connecting to DB
connectDatabase();



app.listen(process.env.PORT,()=>{
    console.log(`Server is working on http://localhost:${process.env.PORT}`)
});

