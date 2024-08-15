import userModel from "../models/user.model.js"

const getUsers = async (req,res) => {
   try{
    const loggedInUserId = req.user._id
    const filteredUsers = await userModel.find({_id:{$ne: loggedInUserId}}).select("-password")
    res.status(200).json(filteredUsers)

   }catch(error){
      console.log(error)
      res.status(500).json({error:"Internal Server Error"})
   }
}

export {getUsers}