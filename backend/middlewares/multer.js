import multer from "multer";
// Express cannot handle multipart/form-data 
// Multer parses that data and makes the uploaded files available in req.file or req.files.previously we used fileupload package

// diskStorage=store file on computer
const storage =multer.diskStorage({
    filename:function(req,file,callback){
        callback(null,file.originalname)
    }
})

const upload=multer({storage})
export default upload