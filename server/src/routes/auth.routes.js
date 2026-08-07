const express = require("express")

const authRouter = express.Router();

const {
    registerUser,
    loginUser,
    logoutUser
} = require("../controllers/auth.controller");



// Registration (the handler will be replaced by the handlers from controllers later)

authRouter.post("/register", registerUser)

//  Login

authRouter.post("/login",loginUser)

// Logout User

authRouter.post("/logout",logoutUser)






module.exports = authRouter;