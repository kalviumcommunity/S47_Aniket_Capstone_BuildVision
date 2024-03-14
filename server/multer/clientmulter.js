const multer=require('multer')
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'Upload/Client')
    },
    filename:(req,file,cb)=>{
        const cfile=Date.now()+file.originalname
        cb(null,cfile)
    }
})
exports.clientupload=multer({storage: storage})