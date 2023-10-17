const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const userSchema = require("../model/userSchema");
const ErrorHandler = require("./ErrorHandler");

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
    let token;
  
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
  
        const decode = jwt.verify(token, process.env.TOKEN_SECRETE_KEY);
  
        req.user = await userSchema.findById(decode.id).select("-password");
  
        next()
    }
  
    if (!token) {
      return next(new ErrorHandler("Please login before access this",401));
    }
  });
  

  exports.authorizeRoles = (...roles) => {
    debugger;
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return next(
          new ErrorHandler(
            `Role: ${req.user.role} is not allowed to access this resouce `,
            403
          )
        );
      }
  
      next();
    };
  };