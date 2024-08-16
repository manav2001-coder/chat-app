import { createContext,useState, useContext, useEffect } from "react";
import { authContext } from "./AuthContext";
import io from 'socket.io-client'

const SocketContext = createContext()

const SocketContextProvider = ({children}) => {
    const [socket,setSocket] = useState(null)
    const [onlineUsers,setOnlineUsers] = useState(null)
    const { authUser } = useContext(authContext)
    
    useEffect(() => {
        if(authUser){
            const socket = io("https://chat-app-og0l.onrender.com",{
                query:{
                    userId:authUser._id
                }
            })
            setSocket(socket)
            socket.on("getOnlineUsers",(users) => {
                setOnlineUsers(users);
            })
            return () => socket.close();
        }else{
            if(socket){
                socket.close()
                setSocket(null)
            }
        }
    },[authUser])

    return(
        <SocketContext.Provider value={{socket,onlineUsers}}>
          {children}
        </SocketContext.Provider>
    )
}

export { SocketContext,SocketContextProvider }