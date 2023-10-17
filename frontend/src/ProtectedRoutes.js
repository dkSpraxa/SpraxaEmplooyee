import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Login from "./components/Login";

const ProtectRoute = ({children})=>{
    
    const {user} = useSelector(state=>state.userStore)
    const navigate = useNavigate()

    useEffect(()=>{
        if(!user){
            navigate("/")
        }
    },[user,navigate])

    if(!user){
        return <Login/>
       
    }else{
        return children
    }
}

export default ProtectRoute