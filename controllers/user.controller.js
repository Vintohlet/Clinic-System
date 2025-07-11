import { User } from "../models/User.js"
class UserController{
async create (req,res){
    try {
        const {firstName,lastName, age, email, isManager } = req.body;
        const user = await new User({firstName,lastName, age, email, isManager}).save();
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
    const {firstName,lastName, email, password, age} = req.body
   const updatedUser =  await User.findByIdAndUpdate( req.params.id, {
        firstName,
        lastName,
        age,
        email,
        password
    }, { new: true })
    if(!updatedUser){
        return res.status(404).json({ error: "User not found" });
    }
    res.status(200).send("User updated Successfuly")
} catch (error) {
    res.status(500).json({error:error.message})
}
}
async getMe(req, res) {
  try {
    console.log("req.userId =>", req.userId);
    const user = await User.findById(req.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      user,
      role: req.role,
      isManager: req.isManager || false,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
}
export default  new UserController();