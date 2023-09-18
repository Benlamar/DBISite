import { Fragment, React, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./navbar.css";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";

// import useAxiosInterceptor from "../../hook/useAxiosInterceptor";
import useContextAuth from "../../hook/useContextAuth";
import axios from "../../api/axios";

const Navbar = () => {
  const { setAuth } = useContextAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await axios
      .get("/logout", {
        withCredentials: true,
      })
      .then((res) => {
        setAuth({});
        navigate("/login");
      })
      .catch((err) => {
        setAuth({});
        navigate("/login");
        console.log(err.response)});
  };

  useEffect(() => {
    document.addEventListener("scroll", () => {
      let navbar = document.querySelector("#navbar");
      if (window.scrollY > 40) {
        navbar?.classList.add("scrolled_navbar");
        navbar.style.color = "white";
      } else {
        navbar?.classList.remove("scrolled_navbar");
        navbar.style.color = "black";
      }
    });
  }, []);

  return (
    <Fragment>
      <nav id="navbar" className="">
        <span id="brand_name">
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
            DBI Student Register
          </Link>
        </span>
        <button
          style={{
            marginLeft: "48px",
            marginRight: "48px",
            boxShadow: "0px 0px -1px 1px #000000",
            padding: "4px 16px",
          }}
          className="d-btn"
          onClick={(e) => handleLogout()}
        >
          logout
        </button>
      </nav>

      <Outlet />
    </Fragment>
  );
};

export default Navbar;
