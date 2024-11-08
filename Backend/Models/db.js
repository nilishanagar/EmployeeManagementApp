require('dotenv').config();
const mongoose= require('mongoose');

const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL)
 .then(()=>{
    console.log("Mongodb connected successfully..");
 }).catch((err)=>{
    console.log("Error in Mongodb connection...",err);
 })