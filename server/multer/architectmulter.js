const multer=require('multer')
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'Upload/Architect')
    },
    filename:(req,file,cb)=>{
        const afile=Date.now()+file.originalname
        cb(null,afile)
    }
})
exports.archiupload=multer({storage: storage})