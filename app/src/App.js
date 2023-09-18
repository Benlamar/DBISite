import "./App.css";
import { Routes, Route, Outlet } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Student from "./components/Student/Student";
import ViewStudents from "./components/Student/ViewStudents";
import ShowStudent from "./components/Student/ShowStudent";
import Course from "./components/Course/Course";
import Users from "./components/Users/Users";
import Navbar from "./components/Navbar/Navbar";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.js";
import { React, useEffect, useState } from "react";

import Login from "./components/Login/Login";
import useContextAuth from "./hook/useContextAuth";

import { QueryClient, QueryClientProvider } from "react-query";
import useRefreshToken from "./hook/useRefreshToken";
const queryClient = new QueryClient();

export const Refresh = () => {
  const refresh = useRefreshToken();
  const { auth } = useContextAuth();
  const [load, setLoading] = useState(true)

  const verifyRefresh = async() =>{
    try{
      await refresh() 
    }
    catch(err){
      console.log(err)
    }
    finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    !auth.token?verifyRefresh():setLoading(false)
  },[])

  return <>
    {load ? <p>Loading..., Please wait</p> : !auth.token ? <Login/> : <Outlet/>}
  </>
  
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<Refresh/>}>
            <Route path="/" element={<Navbar />}>
              <Route index element={<Dashboard />} />

              <Route element={<ProtectedRoute/>}>
                <Route path="/student/add" element={<Student />} />
                <Route path="/users" element={<Users />} />
              </Route>

              <Route path="/student/show" element={<ShowStudent />} />
              <Route path="/student" element={<ViewStudents />} />
              <Route path="/course" element={<Course />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </QueryClientProvider>
  );
}

export default App;
