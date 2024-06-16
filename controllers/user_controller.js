const Users = require("../model/user_model");
const ErrorHandler = require("../utilites/ErrorHandler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.userSignup = async (req,res,next) =>{

    const {name,email,password} = req.body;

    const newUser = {
        name,
        email,
        password: await bcrypt.hash(password, 10),
        avator:{
            public_id: "this is sample public id",
            profile_id: "this is sample profile id"
        },
        role: "user",
    }

  const existingUser = await Users.findOne({email: email});

  if(existingUser){
    return next(new ErrorHandler("Eamil already register"))
  } 

  const createUser = await Users.create(newUser);

  await createUser.save();

  res.status(200).json({
    success: true,
    message: "User created successfully",
    newUser,
  })



}



exports.userLogin = async (req,res,next) =>{
    const {email,password} = req.body;

    const user = await Users.findOne({email:email});

    if(!user){
        return next(new ErrorHandler("User not found", 404))
    }

 

    if(!user.password === password){
        return next(new ErrorHandler("Password Wrong", 404))
    }


    const token = jwt.sign({email:email}, process.env.JWT_SECRET, {
        expiresIn: "5d",
    });

    const options = {
        expires: new Date(Date.now() + "5" * 24*60*60*1000),
        httpOnly: true,
    }

    res.status(200).cookie("token", token, options).json({
        success: true,
        message: "successfully login",
        user,
        token
    })
}



exports.logOut = async (req,res,next) =>{

    res.cookie("token", null, {
        expires: new Date(Date.now())
    }).json({
        success: true,
        message: "Logout Successful"
    })
}




exports.me = async (req,res,next) =>{
    res.send("me details")
}




exports.allUsers = async (req,res,next) =>{
      const users = await Users.find();

      res.status(200).json({
        success:true,
        users
      })
}