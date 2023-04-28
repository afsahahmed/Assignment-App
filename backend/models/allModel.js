const mongoose= require("mongoose");
const bcryptjs= require("bcryptjs");

const teacherSchema= new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    isBlocked:{
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: "admin"
    }

})
// const question= new mongoose.model("Question", questionSchema);
// const assignment= new mongoose.model("Assignment", assignmentSchema);
const teacher= new mongoose.model("Teacher", teacherSchema);

teacherSchema.pre("save", async  function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password= await bcryptjs.hash(this.password,10);
})
module.exports= teacher;