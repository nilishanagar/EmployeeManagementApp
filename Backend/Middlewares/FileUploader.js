const multer = require('multer');
const {CloudinaryStorage} = require('multer-storage-cloudinary');
const cloudinary= require('cloudinary').v2;

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_SECRET_KEY
})

const storage=new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:'uploads',
        format:async (req,file)=>{
            const ext = file.originalname.split('.').pop().toLowerCase();
            return ext==='jpg'|| ext==='jpeg'?'jpg':'png';
        },
        public_id:(req,file)=> file.originalname.split('.')[0]+""

    }
})

const cloudinaryFileUploader=multer({storage:storage});//use this storage format to store coming file


module.exports={
    cloudinaryFileUploader
}