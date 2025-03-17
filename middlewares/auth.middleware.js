import jwt from "jsonwebtoken"
import "dotenv/config";
export function authUser(req,res,next) {
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(401).json({message:"Token is required!"})
    }
    const token = authHeader.replace(/^Bearer\s/, "")
    console.log("Extracted Token:", token);
    try {
        console.log("Decoded Token:", jwt.decode(token));
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.userId = decoded.userId;
        next();
    } catch (error) {
       res.status(401).json({message:"Invalid Token"}) 
    }
}