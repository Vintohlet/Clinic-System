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
        req.role = decoded.role;
        next();
    } catch (error) {
       res.status(401).json({message:"Invalid Token"}) 
    }
}

export function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Access token required" });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token" });
        }

        req.userId = decoded.userId;
        req.role = decoded.role; 
        next();
    });
}
export function checkIsManager(req,res,next) {
if (req.isManager) {
    next()
} else {
   return res.status(403).json({message:"Forbidden"}) 
}
}

export function checkIsDoctor(req, res, next) {
    if (req.role === "doctor") {
        next();
    } else {
        return res.status(403).json({ message: "Access denied. Only doctors can perform this action." });
    }
}