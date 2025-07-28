const express = require("express");
const app = express();
const cookieParser = require("cookie-parser")

const errorMiddleware = require('./middleware/error')

app.use(express.json())

app.use(cookieParser());

app.set('query parser', 'extended');
// It configures Express to use the advanced 'qs' library for parsing URLs, which understands nested objects
// ⭐ This solved the issue of getting {price[gt]': '1000', 'price[lt]': '3000'} instead of getting { price: { gt: '1000', lt: '3000' } }

// Routes Import

const productRoute = require("./routes/productRoute");
const userRoute  = require("./routes/userRoute");

app.use("/api/v1", productRoute);
app.use("/api/v1/", userRoute);


// MIDDLEWARE for ERRORs
app.use(errorMiddleware);


module.exports = app