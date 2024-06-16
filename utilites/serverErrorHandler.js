const ErroHandler = require("./ErrorHandler");
const ServerError = (error,req,res,next) =>{
    const statusCode = error.statusCode || 404;
    const message = error.message || "Server Error";

    // wrong mongodb id error
    if(error.name === "CastError"){
        const message = `Resource not found. invalid ${error.path}`;
        error = new ErroHandler(message, 404);
    }

    // mongoose duplicate key error
    if(error.code === 11000){
        const message = `Duplicate ${Object.keys(error.keyValue)} Entered`
        error = new ErroHandler(message, 404);
    }

     // wrong jwt error
     if(error.name === "JsonWebTokenError"){
         const message = `json web token is invalied, try again`;
         error = new ErroHandler(message, 400);
     }

    //  jwt expire error

    if(error.name === "TokenExpiredError"){
        const message = `json web token is Expired, try again`;
        error = new ErroHandler(message, 404);
    }


    res.status(statusCode).json({
        success: false,
        message: message
    })
}

module.exports = ServerError;