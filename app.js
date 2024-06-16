// core module require
const express = require("express");
const app = express();
const cookie_parser = require("cookie-parser");


app.use(express.json())
app.use(cookie_parser())



// route require
const userRoute = require("./routes/user_route")



// route use
app.use("/api/user", userRoute)



// custome module require
const AsyncError = require("./midelware/AsyncError");
const serverErrorHandler = require("./utilites/serverErrorHandler");


// AsyncError
app.use(AsyncError)

// serverError 
app.use(serverErrorHandler)

module.exports = app;