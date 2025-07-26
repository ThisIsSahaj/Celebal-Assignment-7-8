const express = require("express");
const app = express();

const errorMiddleware = require('./middleware/error')

app.use(express.json())

app.set('query parser', 'extended');
// It configures Express to use the advanced 'qs' library for parsing URLs, which understands nested objects
// ⭐ This solved the issue of getting {price[gt]': '1000', 'price[lt]': '3000'} instead of getting { price: { gt: '1000', lt: '3000' } }

// Routes Import

const product = require("./routes/productRoute");

app.use("/api/v1", product);


// MIDDLEWARE for ERRORs
app.use(errorMiddleware);


module.exports = app