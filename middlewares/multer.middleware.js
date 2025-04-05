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
export const upload = multer({storage: multer.memoryStorage(), fileFilter});