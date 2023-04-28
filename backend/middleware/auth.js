const jwt= require("jsonwebtoken");
const dotenv= require ("dotenv");
dotenv.config({path: "./config/config.env"});

// exports.verifyToken=async (req,res,next)=>{
//     const token = req.body.token || req.query.token || req.headers['authorization'];
//     if(!token){
//         res.status(200).json({
//             status: false,
//             message: "Token is Required for authentication"
//         })
//     }else{
//         try {
//            const decode= jwt.verify(token,process.env.JWT_SECRET);
//            req.user= decode;
//            return next();
//         } catch (error) {
//             res.status(400).send(error.message);
//         }
//     }

// }

exports.authorizedRoles = (...permissions)=>{
    return (req,res,next)=>{
        const token= req.headers['authorization'];
        if(!token){
            res.status(200).json({
                status: false,
                message: "Token is Required for authentication"
            })
        }else{
            try {
               const decode= jwt.verify(token,process.env.JWT_SECRET);
               console.log(decode)
               let { user:{ role, }} = decode;
            //    let { iat, exp, user } = decode;
               console.log({role})
               console.log(permissions)
               console.log(permissions.includes({role}))
               if(permissions.includes(role))
               {
                next();
            }else{
                res.status(400).json({
                success: false,
                message: "Not Authorized"
            })
        }
            } catch (error) {
                res.status(400).send(error.message);
            }
        }
        const userRole= req.user;
        // console.log(req.user.role);
        
    }
}