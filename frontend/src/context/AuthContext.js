import { createContext,useState } from "react";

const authContext = createContext()

const AuthContextProvider = ({children}) => {
    const [authUser,setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user")) || null)
    const [search,setSearch] = useState("")
    return(
        <authContext.Provider value={{authUser,setAuthUser,search,setSearch}}>
            {children}
        </authContext.Provider>
    )
}

export {authContext,AuthContextProvider}