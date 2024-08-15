import userModel from '../models/user.model.js'
import bcrypt from 'bcrypt'
import generateToken from '../utils/generateToken.js'

const loginUser = async (req,res) => {
   try{
       const { username,password } = req.body
       const user = await userModel.findOne({username})
       if(!user){
           return res.status(400).json({error:"User doesn't exist!"})
       }

       const isPasswordCorrect = await bcrypt.compare(password,user.password)
       if(!isPasswordCorrect){
           return res.status(400).json({error:"Invalid Password"})
       }
       const token = generateToken(user._id,res)

       return res.status(200).json({_id:user._id,fullName:user.fullName,username:user.username,profilePic:user.profilePic})

   }catch(error){
       console.log(error)
       return res.status(500).json({error:"Internal server error"})
   }
}

const signupUser = async (req,res) => {
   try{
       const {fullName,username,password,confirmPassword,gender} = req.body
       if(confirmPassword !== password){
           return res.status(400).json({error:"Passwords don't match"})
       } 
       const user = await userModel.findOne({username})
       if(user){
           return res.status(400).json({error:"User already exists!"})
       }
       const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
       const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

       //Hash Password Here
       const salt = await bcrypt.genSalt(10)
       const hashedPassword = await bcrypt.hash(password,salt)
       const new_user = userModel({
           fullName,
           username,
           password:hashedPassword,
           gender,
           profilePic:gender ==='male' ? boyProfilePic :girlProfilePic
       })

       if(new_user){
          await new_user.save()
          const token = generateToken(new_user._id,res)
          return res.status(201).json({_id:new_user._id,fullName:new_user.fullName,username:new_user.username,profilePic:new_user.profilePic})
       }else{
           return res.status(400).json({error:"Invalid user data"})
       }

   }catch(error){
       console.log(error)
       return res.status(500).json({error:"Internal Server Error"})
   }

}

const logoutUser = (req,res) => {
    try{
        res.clearCookie("jwt")
        res.status(200).json({message:"Logged Out Successfully"})
    }catch(error){
        res.status(500).json({error:"Internal Server Error"})
    }
}

export { loginUser,logoutUser,signupUser }