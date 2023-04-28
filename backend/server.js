// const express= require("express");
const app= require("./app");

// config
const dotenv= require ("dotenv");
dotenv.config({path: "./config/config.env"});

const connectDB = require("../config/database");

//Handling uncaught Exception
process.on("uncaughtException",(error)=>{
    console.log(`Error: ${error.message}`);
    console.log("Shutting down the Server due to Uncaught Exception");

})
//connecting to DB
connectDB();

const server= app.listen(process.env.PORT,()=>{
    console.log(`server is working on http://localhost:${process.env.PORT}`);
})