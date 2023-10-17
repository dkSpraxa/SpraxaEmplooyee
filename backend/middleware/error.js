const ErrorHandler = require("./ErrorHandler");

module.exports = (err,req,res,next) =>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

     // Mongoose duplicate key error
     if(err.code === 11000){
         const message = `${Object.keys(err.keyValue)} is already registered`
         err = new ErrorHandler(message,400)
     }

    res.status(err.statusCode).json({
        success:false,
        message:err.message
    });
}