const moongose= require("mongoose");
// const dotenv= require("dotenv");
// dotenv.config({path:"./config/config.env"});

const connectDB =()=>{
    // console.log(process.env.DB_URI)
    moongose.connect(process.env.DB_URI,{useNewUrlParser: true, useUnifiedTopology: true})
.then((data)=>{
    console.log(`connected to mongodb server: ${data.connection.name}`);
})

}
module.exports=connectDB;