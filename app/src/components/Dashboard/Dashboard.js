import { React } from "react";
import { Link } from "react-router-dom";
import "./dashboard.css";

import useContextAuth from "../../hook/useContextAuth";

const Dashboard = () => {
  const { auth } = useContextAuth();

  return (
    <div className="dashboard">
    <div id="dashboard_background">
    <img
        style={{width:'100%', height:'100%', objectFit: 'cover', objectPosition: 'top center', position:'absolute'}}
        src="./sun_set_backgroud_dbi.jpg"
        alt="Dashboard Background"
      />
    </div>
      
      <h1 className="title text-center mt-5">
        Welcome, <span id="user">{auth.user}</span>
      </h1>
      <h1 className="title text-center mt-5">Student Register Dashboard</h1>

      <div className="dashboard-menu d-flex justify-content-center p-4">
        <Link to="/course">
          <button className="c-btn m-0">Course</button>
        </Link>
        <Link to="/student">
          <button className="c-btn m-0">View Student</button>
        </Link>
        {auth.role === "admin" ? (
          <>
            <Link to="/users">
              <button className="c-btn m-0">Users</button>
            </Link>
            <Link to="/student/add">
              <button className="c-btn m-0">Add Students</button>
            </Link>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Dashboard;
