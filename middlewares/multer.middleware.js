import multer from "multer";
import {v4 as uuidv4} from "uuid"

function generateFilename(originalname) {
    const extension = originalname.split(".").pop();
    const filename = uuidv4()
   return `${filename}.${extension}` 
}
function fileFilter(req,file, callback){

        if(file.mimetype.includes("application/pdf")){
            callback(null, true)
        }
        else{
            callback(null, false)
        }
}
const storage = multer.diskStorage({
    destination:(req,file, callback) => {
        callback(null, "uploads/")
    },
    filename: (req,file, callback) =>{
        callback(null, generateFilename(file.originalname));
    }
})
export const upload = multer({storage: storage, fileFilter});