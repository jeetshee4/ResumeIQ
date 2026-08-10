const User = require("../models/user.model")
const bcrypt = require("bcrypt")

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        //   1. Check if a fields are provided
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All the fields are required",
            });
        }

        //  2. Check if user already exists

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.status(409).json({
                message: "User already exists",
            });
        }


        //   3. Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);


        //  4. Create User
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        })


        //  5. Send response
        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
        });


    }

    catch (error) {
        console.error("Registered error:", error);

        return res.status(500).json({
            message: "Server error"
        })
    }




}


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Check input

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
            });
        }

        // 2. Find user

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        // 3. Compare password

        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        )

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        // 4. Create Session

        req.session.userId = user._id;

        // 5. Send Response

        return res.status(200).json({
            message: "Login Successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },



        });


    }
    catch (error) {
        console.error("Login error:", error);

        return res.status(500).json({
            message: "Server error",
        });
    }


};

const logoutUser = (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            console.error("Logout error:", error);

            return res.status(500).json({
                message: "Logout failed",
            });
        }

        res.clearCookie("connect.sid");

        return res.status(200).json({
            message: "Logout successful",
        });




    });
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser
};