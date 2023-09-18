import { useRef } from "react";
import { React } from "react";
import "./login.css";
import axios from "../../api/axios";
import useContextAuth from "../../hook/useContextAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const email_id = useRef("");
  const password = useRef("");

  const { setAuth, persist, setPersist } = useContextAuth();

  const onSubmit = async () => {
    const data = {
      email: email_id.current.value,
      password: password.current.value,
    };

    await axios
      .post("/login", data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((response) => {
        // console.log(response.data)
        const token = response.data.token;
        const id = response.data.id;
        const role = response.data.role;
        const user = response.data.user;
        setAuth({ token:token, id:id, user:user, role:role });

        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="login">
      <div className="login-nav">
        <img src="./dbi-rotate-logo.gif" alt="spinning-dbi-logo" />
        <div className="login-title">
          <h3>Don Bosco Institute</h3>
          <span>Noonmati, Kharguli Hills,</span>
          <span>Guwahati - 781004, Assam, India</span>
        </div>
      </div>

      <div className="login-container">
        <div className="dbi">
          <img src="./donbosco.jpg" alt="Don Bosco" />
        </div>

        <div className="login-form">
          <input
            autoComplete="off"
            className="login-inp"
            type="text"
            ref={email_id}
            placeholder="Enter email id"
          />
          <input
            className="login-inp"
            autoComplete="off"
            type="password"
            ref={password}
            placeholder="Enter password"
          />

          {/* Submit */}
          <button className="login-btn" onClick={(e) => onSubmit()}>
            Submit Application
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
