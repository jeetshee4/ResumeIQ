

const registerUser = (req, res)=>{
    res.send("Register Controller")
}


const loginUser = (req, res)=>{
    res.send("Login Controller")
}

const logoutUser = (req, res)=>{
    res.send("Logout Controller")
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser
};