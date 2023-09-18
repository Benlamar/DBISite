import { Outlet, useNavigate } from "react-router-dom";
import Login from "../Login/Login";
import useContextAuth from "../../hook/useContextAuth";
import Dashboard from "../Dashboard/Dashboard";

const ProtectedRoute = () => {
    const { auth } = useContextAuth();

    return <>
        {auth.role === "admin" ?  <Outlet/> : auth.token ? <Dashboard/> : <Login/>}
    </>
}




export default ProtectedRoute