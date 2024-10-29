const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");


exports.isAuthenticated = catchAsyncErrors(async(req,res,next) => {
    const {pass} = req.body;

    if(pass != process.env.PASSWORD){
        return next(new ErrorHandler("Not Allowed", 401));
    }

    next();
});

