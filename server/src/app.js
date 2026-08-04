const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")


dotenv.config()

const app = express();

// Routers import
const authRouter = require("./routes/auth.routes")
const resumeRouter = require("./routes/resume.routes");


// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use(cors());


// Routes Middleware

app.use("/api/auth" ,authRouter);
app.use("/api/resume", resumeRouter);



// Routes
app.get('/',(req, res, next)=>{
    res.send("ResumeIQ is running ");
})










// Server listening 
const PORT = process.env.PORT || 5000 ;
app.listen(PORT , ()=>{
    console.log(`Server is running on port ${PORT}`);
})