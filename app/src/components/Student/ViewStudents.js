import { React, useState } from "react";
import useAxiosInterceptor from "../../hook/useAxiosInterceptor";
import { useNavigate } from "react-router-dom";

import "./student.css";
import Footer from "../Footer/Footer";

const ViewStudents = () => {
  const axiosAuth = useAxiosInterceptor();
  const navigator = useNavigate();
  const [studentList, setStudentList] = useState([]);

  const [searchQuery, setSearchQuery] = useState({
    id: "",
    name: "",
    course: "",
  });

  const handleSearch = (e) => {
    setSearchQuery({ ...searchQuery, [e.target.name]: e.target.value });
  };

  const handelSearch = async (e) => {
    e.preventDefault();
    console.log(searchQuery);
    const response = await axiosAuth
      .post("/student", searchQuery)
      .then((res) => {
        console.log("-->", res.data);

        setStudentList(res.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
        return err.response.data;
      });
  };

  const handleShow = async (e, index) => {
    e.preventDefault();
    navigator("/student/show", {
      state: { studentid: studentList[index].Student.student_id },
    });
  };

  return (
    <>
      <h1 className="title text-center">Search Student</h1>

      {/* Search section */}
      <div className="px-5 student-list">
        <div className="search">
          <form className="form-section" style={{ with: "100%" }}>
            <div className="form-row d-flex justify-content-center flex-wrap">
              {/* <input
                className="inp m-1"
                placeholder="Student id"
                name="id"
                onChange={(e) => handleSearch(e)}
              /> */}
              <input
                className="inp m-1"
                placeholder="Student name"
                name="name"
                onChange={(e) => handleSearch(e)}
              />
              <input
                className="inp m-1"
                placeholder="Couse"
                name="course"
                onChange={(e) => handleSearch(e)}
              />
            </div>
            <div className="form-row d-flex justify-content-center">
              <input
                className="c-btn px-3 mt-2"
                value="Search"
                type="button"
                onClick={(e) => handelSearch(e)}
              />
            </div>
            <span style={{ fontSize: "13px" }}>
              * To search all student, leave all inputs empty and search
            </span>
          </form>
        </div>

        {/* Student view section  */}
        <div className="student-view">
          {studentList.map((values, index) => (
            <div
              key={index}
              className="student-card"
              onClick={(e) => handleShow(e, index)}
            >
              <div className="card-image">
                <img src="./images/avatar.jpg" alt="student" />
              </div>

              {/* here continue */}
              {Object.entries(values.Student).map((data, key) =>
                data[0] === "full_name"
                  ? [
                      <div key={key + data[0]} className="student-label">
                        {data[0]}
                      </div>,
                      <div key={data[1]} className="student-value">
                        {data[1]}
                      </div>,
                    ]
                  : data[0] === "phone"
                  ? [
                      <div key={key + data[0]} className="student-label">
                        {data[0]}
                      </div>,
                      <div key={data[1]} className="student-value">
                        {data[1]}
                      </div>,
                    ]
                  : data[0] === "email"
                  ? [
                      <div key={data[0] + key} className="student-label">
                        {data[0]}
                      </div>,
                      <div key={data[1] + key} className="student-value">
                        {data[1]}
                      </div>,
                    ]
                  : data[0] === "dob"
                  ? [
                      <div key={data[0] + key} className="student-label">
                        {data[0]}
                      </div>,
                      <div key={data[1]} className="student-value">
                        {data[1].split("T")[0]}
                      </div>,
                    ]
                  : data[0] === "gender"
                  ? [
                      <div key={data[0] + key} className="student-label">
                        {data[0]}
                      </div>,
                      <div key={data[1]} className="student-value">
                        {data[1]}
                      </div>,
                    ]
                  : null
              )}

              {/* continue here */}
              <div className="single-row">
                <span className="sub-title text-underline">
                  Course attended
                </span>

                <ul className="course-list" style={{ margin: 0 }}>
                  {Object.entries(values.Course).map((value, key) =>
                    value[0] === "course" ? (
                      <li key={key + value[1]}>
                      {value[1]+",  "}
                      <span style={{ fontStyle: "italic" }}>{values.start_period.split("T")[0] + " - " +values.end_period.split("T")[0]}</span>
                      </li>
                    ) : null
                  )}
                </ul>

              </div>

            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ViewStudents;
