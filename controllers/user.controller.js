import { User } from "../models/User.js"
class UserController{
async create (req,res){
    try {
        const {userName, age, email } = req.body;
        const user = await new User({userName, age, email}).save();
        res.status(201).json(user)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}
async getUserById(req,res){
    try {
        const user = await User.findById(
            req.params.id
        ).populate("appointments")
        if(!user){
            throw new Error("Patient not found");
            
        }
        res.json(user)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}
async getAllUsers(req,res){
    try {
        const users = await User.find()
        if(users.length === 0){
            throw new Error("Users not found");
            
        }
        res.json(users)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}
async deleteUserById(req,res){
    try {
      const user = await User.findByIdAndDelete(
        req.params.id 
      )
      if(!user){
        return res.status(404).json({ error: "Patient not found" });
      }
      res.status(200).send("User Deleted Successfuly")
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}
async updateUserById(req,res){
try {
    const {userName, age} = req.body
   const updatedUser =  await User.findByIdAndUpdate( req.params.id, {
        userName,
        age
    }, { new: true })
    if(!updatedUser){
        return res.status(404).json({ error: "User not found" });
    }
    res.status(200).send("User updated Successfuly")
} catch (error) {
    res.status(500).json({error:error.message})
}
}
}
export default  new UserController();