// const userModel= require ("../models/userModel");

const question = require("../models/quesModel")
const bcryptjs  = require("bcryptjs");
const jwt= require("jsonwebtoken");
const dotenv= require ("dotenv");
dotenv.config({path: "./config/config.env"});


// Register Question (CREATE)
exports.createQuestion= async(req,res,next)=>{
    const quest = await question.create(req.body);
    res.status(201).json({
        success: true,
        quest
    });
}

// Get Question Details (READ)
exports.getQuesDetails=async(req,res,next)=>{
    try {
        const quest= await question.findById(req.body.id);
        if(!quest){
            res.status(400).json({
                success: false,
                message: "Question Not Found"
            })
        }
        res.status(200).json({
            success:true,
            Question: quest
        });
    } catch (error) {
        res.send(400).json({
            success: false,
            message: error.message
        })
    }
}

// UPDATE PRODUCT --- (admin)
exports.updateQuestion= async(req,res,next)=>{
    try {
        let quest= await question.findById(req.params.id);
        if(!quest){
            res.status(400).json({
                success: false,
                message: "Question Not Found"
            })
        }
        quest= await question.findByIdAndUpdate(req.body.id, req.body, 
            {new: true, 
            useFindAndModify: false,
            runValidators: true 
        })
        res.status(200).json({
            success: true,
            Updated_Question: quest
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
        
}

// DELETE Question -- (Delete)
exports.deleteQuestion= async(req,res,next)=>{
    try {
        const quest= await question.findById(req.body.id);
        if(!quest){
            res.status(400).json({
                success: false,
                message: "Question Not Found"
            })
        }
        await quest.deleteOne();
        res.status(200).json({
            success: true, 
            message: "Question Deleted successfully", 
            deleted_Question: quest
    });

    } catch (error) {
        res.status(200).json({
            success: false,
            message: error.message
        })
    }
            
}

