// const userModel= require ("../models/userModel");

const teacher = require("../models/allModel")

const bcryptjs  = require("bcryptjs");
const jwt= require("jsonwebtoken");
const dotenv= require ("dotenv");
dotenv.config({path: "./config/config.env"});

// JWT Token
const getToken=async (user)=>{
    const token= await jwt.sign({user},process.env.JWT_SECRET,{expiresIn: '1d'});
    return token;
}

// // Login User
exports.loginUser=async (req,res,next)=>{
        const id= req.body.id;
        // console.log(id)
       const password= req.body.password;
       const teacherData= await teacher.findById(id);
    //    console.log(teacherData)
    if(teacherData){
        const passwordMatch= await bcryptjs.compare(password,teacherData.password);
        if(passwordMatch){
            const token= await getToken(teacherData);
            const teacherResult= {
                _id: teacherData._id,
                name: teacherData.name,
                email: teacherData.email,
                password: teacherData.password,
                role: teacherData.role,
                token: token 
            }
            const Login= {
                success: true,
                message: "Login Successful",
                data: teacherResult
            }
            res.status(200).json({
                staus: true,
                Login
            })
            // pm.environment.set("teacher_key", token);
        }
        else{
            res.status(400).json({
                status: false,
                message: "Incorrect Credentials"
            })
        }
    }else{
        res.status(400).json({
            status: false,
            message: "Incorrect Credentials"
        })
    }
}

// Admin Blocking Teacher
exports.blockTeacher= async(req,res,next)=>{
    let teach= await teacher.findById(req.body.id);
        if(!teach){
            res.status(400).json({
                success: false,
                message: "User Not Found"
            })
        }
        teach= await teacher.findByIdAndUpdate(req.body.id, req.body, 
            {new: true, 
            useFindAndModify: false,
            runValidators: true 
        })
        res.status(200).json({
            success: true,
            message: "User is successfully Blocked",
            Blocked_User: teach
        })

}

// Register Teacher
exports.registerTeacher= async(req,res,next)=>{
    try {
        const {name,email,password,role}= req.body;
    const pass= await bcryptjs.hash(password,10);
    // console.log(pass)
    const teach = await teacher.create(
       { name:name,email: email,password: pass, role: role }
    );
    res.status(201).json({
        success: true,
        teach
    });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
    
}

// Get Teacher Details (READ)
exports.getUserDetails=async(req,res,next)=>{
    try {
        const teach= await teacher.findById(req.body.id);
        if(!teach){
            res.status(400).json({
                success: false,
                message: "User Not Found"
            })
        }
        // console.log(teach.isBlocked)
        if(teach.isBlocked===false){
            res.status(200).json({
                success:true,
                Teacher: teach
            });
        }else{
            res.status(400).json({
                success: false,
                message: "User Not Found"
            })
        }
        
    } catch (error) {
        res.send(400).json({
            success: false,
            message: error.message
        })
    }
}

// UPDATE Teacher Deayils --- (admin)
exports.updateUser= async(req,res,next)=>{
    try {
        let teach= await teacher.findById(req.params.id);
        if(!teach){
            res.status(400).json({
                success: false,
                message: "User Not Found"
            })
        }
        teach= await teacher.findByIdAndUpdate(req.body.id, req.body, 
            {new: true, 
            useFindAndModify: false,
            runValidators: true 
        })
        res.status(200).json({
            success: true,
            Updated_Teacher: teach
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
        
}

// DELETE Teacher -- (Delete)
exports.deleteUser= async(req,res,next)=>{
    try {
        const teach= await teacher.findById(req.body.id);
        if(!teach){
            res.status(400).json({
                success: false,
                message: "User Not Found"
            })
        }
        await teach.deleteOne();
        res.status(200).json({
            success: true, 
            message: "Question Deleted successfully", 
            deleted_Teacher: teach
    });

    } catch (error) {
        res.status(200).json({
            success: false,
            message: error.message
        })
    }
            
}

// Forgot Password --- (admin)
// exports.reseteUserPassword= async(req,res,next)=>{
//     try {
//         const pass= req.body.password;
//         const id= req.body.id;
//         let teach= await teacher.findById(req.body.id);
//         if(!teach){
//             res.status(400).json({
//                 success: false,
//                 message: "User Not Found"
//             })
//         }
//         const token= await getToken(teach.id);
//         const Login= {
//             success: true,
//             message: "Login Successful",
//             data: teacherResult
//         }
//         res.status(200).json({
//             staus: true,
//             Login
//         })
//         teach= await teacher.findByIdAndUpdate(req.body.id, req.body, 
//             {new: true, 
//             useFindAndModify: false,
//             runValidators: true 
//         })
//         res.status(200).json({
//             success: true,
//             Updated_Teacher: teach
//         })
//     } catch (error) {
//         res.status(400).json({
//             success: false,
//             message: error.message
//         })
//     }
        
// }

