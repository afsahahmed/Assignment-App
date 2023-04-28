const mongoose= require("mongoose");
const bcryptjs= require("bcryptjs");

const questionSchema= new mongoose.Schema(
    {
        type: String,
        description:{
            type: String,
            unique: true
        },
        answer:String
    }
)
const question= new mongoose.model("Question", questionSchema);

module.exports= question;