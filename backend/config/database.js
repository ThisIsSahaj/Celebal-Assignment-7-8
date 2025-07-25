const  mongoose = require("mongoose");


const connectDatabase = () => {

    mongoose.connect(process.env.DB_URI).then((data)=>{
        console.log(`✅ MongoDb connected with server: ${data.connection.host}`);
    })
    // .catch((err)=>{
    //     console.log('❌ MongoDB connection error:',err)
    // })
    //NOW WE DONT NEED THE ABOVE CATCH BLOCK AS WE HAVE HANDLED THIS ERROR IN server.js

    // try {
    //     const data = await mongoose.connect(process.env.DB_URI);
    //     console.log(`✅ MongoDB connected with server: ${data.connection.host}`);
    // } catch (error) {
    //     console.error("❌ MongoDB connection error:", error.message);
    // }
    
}

module.exports = connectDatabase