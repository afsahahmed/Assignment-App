// const userModel= require ("../models/userModel");

const assignment = require("../models/assignModel")
const bcryptjs  = require("bcryptjs");
const jwt= require("jsonwebtoken");
const dotenv= require ("dotenv");
dotenv.config({path: "./config/config.env"});


// Register Assignment (CREATE)
exports.createAssignment= async(req,res,next)=>{
    const assign = await assignment.create(req.body);
    res.status(201).json({
        success: true,
        assign
    });
}
// get Assignment Details (READ)
exports.getAssignmentDetails= async (req,res,next)=>{
    // const assign= await 
    const assignData= await assignment.findById(req.params.id).populate("Questions");
    if(!assignData){
        res.status(400).json({
            success: false,
            message: "Assignment Not Found"
        })
    }

        res.send(assignData)
}

// // Get Question Details (READ)
// exports.getAssignDetails=async(req,res,next)=>{
//     try {
//         const assign= await assignment.findById(req.body.id);
//         if(!assign){
//             res.status(400).json({
//                 success: false,
//                 message: "Assignment Not Found"
//             })
//         }
//         res.status(200).json({
//             success:true,
//             Assignment: assign
//         });
//     } catch (error) {
//         res.send(400).json({
//             success: false,
//             message: error.message
//         })
//     }
// }

// UPDATE PRODUCT --- (admin)
exports.updateAssignment= async(req,res,next)=>{
    try {
        let assign= await assignment.findById(req.body.id);
        if(!assign){
            res.status(400).json({
                success: false,
                message: "Assignment Not Found"
            })
        }
        assign= await assignment.findByIdAndUpdate(req.body.id, req.body, 
            {new: true, 
            useFindAndModify: false,
            runValidators: true 
        })
        res.status(200).json({
            success: true,
            Updated_Assignment: assign
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
        
}

// DELETE Assignment -- (Delete)
exports.deleteAssignment= async(req,res,next)=>{
    try {
        const assign= await assignment.findById(req.body.id);
        if(!assign){
            res.status(400).json({
                success: false,
                message: "Question Not Found"
            })
        }
        await assign.deleteOne();
        res.status(200).json({
            success: true, 
            message: "Question Deleted successfully", 
            deleted_Assignment: assign
    });

    } catch (error) {
        res.status(200).json({
            success: false,
            message: error.message
        })
    }
            
}


