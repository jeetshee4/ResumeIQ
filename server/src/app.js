const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")


dotenv.config()

const app = express();





// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use(cors());


// Routes
app.get('/',(req, res, next)=>{
    res.send("ResumeIQ is running ");
})










// Server listening 
const PORT = process.env.PORT || 5000 ;
app.listen(PORT , ()=>{
    console.log(`Server is running on port ${PORT}`);
})