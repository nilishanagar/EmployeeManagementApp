const mongoose = require('mongoose');

const EmployeeSchema=mongoose.Schema({
    name:{
        type:String,
        required:true  
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    mobile_no:{
        type:String,
        required:true
    },
    designation:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    course:{
        type:String,
        required:true
    },
    profileImage:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:new Date()
    },
    updatedAt:{
        type:Date,
        default:new Date()
    }
});

const EmployeeModel=mongoose.model('employee',EmployeeSchema)
module.exports=EmployeeModel;