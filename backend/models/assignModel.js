const mongoose= require("mongoose");
const bcryptjs= require("bcryptjs");


const assignmentSchema= new mongoose.Schema(
    {
        Questions:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Question",
            uniqueItems: true,
        }],
        
        Created_By:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Teacher"
        }
    }
)

// ASSIGNMENT MUST HAVE >=5 Qs
assignmentSchema.path('Questions')
    .validate((val) => val.length >= 5, 'Must have minimum 5 Qs');

const assignment= new mongoose.model("Assignment", assignmentSchema);
module.exports= assignment;

