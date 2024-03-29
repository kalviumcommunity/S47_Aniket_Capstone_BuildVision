const multer=require('multer')
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'Upload/Design')
    },
    filename:(req,file,cb)=>{
        const dfile=Date.now()+file.originalname
        cb(null,dfile)
    }
})
exports.designupload=multer({storage:storage})
