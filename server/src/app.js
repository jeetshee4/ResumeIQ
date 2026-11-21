const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const session = require("express-session")
const errorMiddleware = require("./middlewares/error.middleware");

dotenv.config()

const cloudinary = require("./config/cloudinary");
const app = express();

// config import

const connectDB = require("./config/db")





// Routers import
const authRouter = require("./routes/auth.routes")
const resumeRouter = require("./routes/resume.routes");




// Database Connection

// connectDB()


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
// For Frontend connection Front end must be allowed to send and receive credentials 
app.use(
    cors({
        origin: "https://resume-iq-olive-rho.vercel.app",
        credentials: true,
    })
);
app.set("trust proxy", 1);



app.use(

    session({

        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 1000 * 60 * 60 * 24,
        },
    })

)

// Routes
app.get('/', (req, res, next) => {
    res.send("ResumeIQ is running ");
})

// Routes Middleware

app.use("/api/auth", authRouter);
app.use("/api/resume", resumeRouter);
app.use(errorMiddleware);













// Server listening 
const PORT = process.env.PORT || 5000;
const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

    } catch (error) {
        console.error("Failed to start server:", error);
    }
};

startServer();