const express = require("express");
const { userSignup, userLogin, me, logOut, allUsers } = require("../controllers/user_controller");
const {auth, isAdmin} = require("../midelware/Auth");

const Router = express.Router();


// user
Router.post("/signup", userSignup)
Router.post("/login", userLogin)
Router.get("/logout", logOut)
Router.get("/me", auth, me)
// Router.get("/forget")


// admin
Router.get("/admin/users", isAdmin("admin"), auth, allUsers)
Router.get("/admin/user:id")
Router.delete("/admin/user:id")



module.exports = Router;