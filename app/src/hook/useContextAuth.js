import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const useContextAuth = () =>{
    // const {auth} = useContext(AuthContext)
    return useContext(AuthContext)
}


export default useContextAuth