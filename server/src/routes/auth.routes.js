const express = require("express")
const authMiddleware = require("../middlewares/auth.middleware")

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


authRouter.get("/profile" , authMiddleware , (req, res)=>{
    res.status(200).json({
        message: "You are authenticated",
        userId: req.session.userId,
    })
})



module.exports = authRouter;