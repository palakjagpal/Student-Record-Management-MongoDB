//import mongoose
import mongoose from "mongoose"

//creating schema
const StudentSchema =  new mongoose.Schema({
    name : {type : String, required : true},
    age : {type : Number, required : true},
    email : {type : String, required : true, unique : true},
    course : {type : String, required : true},
    createdAt : {type : Date, default : Date.now}
})

const StudentModel = mongoose.model("StudentModel", StudentSchema)

export default StudentModel