const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utilites/ErrorHandler")
const User = require("../model/user_model")


const auth = async (req,res,next) =>{

    const token = req.cookies.token;


    if(!token){
        return next(new ErrorHandler("Please Login, its private route"))
    }

   const decode = jwt.verify(token, process.env.JWT_SECRET);

 const findUser = await User.findOne({email:decode.email});

  req.newUser = findUser

  next()

    
}


const isAdmin = (props) =>{
  return (req,res,next) =>{
    if(props === req.newUser.role){
      next()
    } else{
      return next(new ErrorHandler("Only addmin can be accessed"))
    }
  }
}


module.exports = {auth, isAdmin};