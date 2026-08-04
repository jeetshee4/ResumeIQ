const express = require("express")

const authRouter = express.Router();


// Registration (the handler will be replaced by the handlers from controllers later)

authRouter.post("/register", (req, res ,next)=>{
    res.send("Register Route")
})

//  Login

authRouter.post("/login",(req, res, next)=>{
    res.send("Login Route")
})

// Logout User

authRouter.post("/logout",(req, res, next)=>{
    res.send("Logout Route")
})






module.exports = authRouter;