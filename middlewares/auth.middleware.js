import jwt from "jsonwebtoken"
import "dotenv/config";
export function authUser(req,res,next) {
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(401).json({message:"Token is required!"})
    }
    const token = authHeader.replace(/^Bearer\s/, "")
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.userId = decoded.userId;
        req.isManager = decoded.isManager; 
        next();
    } catch (error) {
       res.status(401).json({message:"Invalid Token"}) 
    }
}

export function checkIsManager(req,res,next) {
    console.log(req.isManager)
if (req.isManager) {
    next()
} else {
   return res.status(403).json({message:"Forbidden"}) 
}
}