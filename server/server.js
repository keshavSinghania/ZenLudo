import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();


//connecting databse
connectDB();

app.get('/',(req, res) => {
    res.send('Api is running....')
})

app.listen(PORT,()=>{
    console.log(`Backend server is running at port ${PORT}`);
})