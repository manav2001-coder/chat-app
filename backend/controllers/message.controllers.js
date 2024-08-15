import messageModel from "../models/message.model.js"
import conversationModel from "../models/conversation.model.js"
import {io,getReceiverSocketId} from "../socket/socket.js"

const sendMessage = async (req,res) => {
    try{
        const message = req.body.message
        const receiverId = req.params.id
        const senderId = req.user._id
        let conversation;

        conversation = await conversationModel.findOne({
            participants: {$all: [senderId,receiverId]}
        })

        if(!conversation){
            conversation = await conversationModel.create({
                participants:[senderId,receiverId]
            })
        }

        const new_message = new messageModel({senderId,receiverId,message})

        
        conversation.messages.push(new_message)
        await Promise.all([conversation.save(), new_message.save()]);

        const receiverSocketId = getReceiverSocketId(receiverId)
        console.log(receiverSocketId)

        io.to(receiverSocketId).emit("newMessage",new_message)

        res.status(201).json({new_message})



    }catch(error){
        console.log(error)
        res.status(500).json({error:"Internal Server Error"})
    }
}

const getMessages = async (req,res) => {
   try{
       const receiverId = req.params.id
       const senderId = req.user._id

       const conversation = await conversationModel.findOne({
        participants:{$all: [senderId,receiverId]}
       }).populate("messages")
       if (!conversation){
         return res.status(200).json({messages:[]});
       }
       res.status(200).json({messages:conversation.messages})
   }catch(error){
       console.log(error)
       res.status(500).json({error:"Internal Server Error"})
   }
}

export {sendMessage,getMessages}