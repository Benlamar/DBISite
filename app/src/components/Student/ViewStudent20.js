import { React, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Modal, Button, Table } from "react-bootstrap";
import axios from "axios";
// import JsonQuery from "json-query";

const ViewStudent = () => {
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
    // console.log("get student");
    const response = await axios.get(
      "http://localhost:8080/student",
      searchQuery
    );
    console.log(response.data);
    setStudentList(response.data);

  };

  return (
    <>
      <Navbar />
      <h1 className="title text-center">Search Student</h1>

      {/* Search section */}
      <div className="px-5">
        <div className="search">
          <form className="form-section" style={{ with: "100%" }}>
            <div className="form-row d-flex justify-content-center flex-wrap">
              <input
                className="inp m-1"
                placeholder="Student id"
                name="id"
                onChange={(e) => handleSearch(e)}
              />
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
        <Table>
          <thead>
            <tr className="text-center">
              <th>Name</th>
              <th>Gender</th>
              <th>DoB</th>
              <th>Phone no</th>
              <th>Email</th>
              <th>Batches</th>
            </tr>
          </thead>
          <tbody>
            {studentList.map((values, index) => (
              <tr key={index} className="text-center">
                {Object.entries(values).map((data, key) =>
                  data[0] === "full_name" ? (
                    <td key={key}>{data[1]}</td>
                  ) : data[0] === "phone" ? (
                    <td key={key}>{data[1]}</td>
                  ) : data[0] === "email" ? (
                    <td key={key}>{data[1]}</td>
                  ) : data[0] === "dob" ? (
                    <td key={key}>{data[1].split("T")[0]}</td>
                  ) : data[0] === "gender" ? (
                    <td key={key}>{data[1]}</td>
                  ) : null
                )}

                {/* continue here */}
                <td className="d-flex justify-content-center">
                  {/* <ul style={{ margin: 0, padding: 0 }}>
                    {JsonQuery("[**][Course][course]", {
                      data: values,
                    }).value.map((course, index) => (
                      <li key={index}>
                        <span className="sub-title">{course}</span>
                        {", " +
                          JsonQuery("Batches[start_period]", {
                            data: values,
                          }).value[index].split("T")[0]}
                      </li>
                    ))}
                  </ul> */}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

      </div>

      <Footer />
    </>
  );
};

export default ViewStudent;
