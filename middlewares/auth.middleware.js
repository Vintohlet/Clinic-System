import jwt from "jsonwebtoken"

export function authUser(req,res,next) {
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(401).json({message:"Token is required!"})
    }
    const token = authHeader.replace(/^Bearer\s/, "")
    console.log("Extracted Token:", token);
    try {
        console.log("Decoded Token:", jwt.decode(token));
        const decoded = jwt.verify(token, "secretkey");
        req.userId = decoded.userId;
        next();
    } catch (error) {
       res.status(401).json({message:"Invalid Token"}) 
    }
}