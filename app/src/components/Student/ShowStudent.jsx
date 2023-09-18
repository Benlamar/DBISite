import useAxiosInterceptor from "../../hook/useAxiosInterceptor";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { useQuery } from "react-query";

import "./student.css";
import Footer from "../Footer/Footer";
import useContextAuth from "../../hook/useContextAuth";

const ShowStudent = () => {
  const axiosAuth = useAxiosInterceptor();
  const { auth } = useContextAuth();

  const location = useLocation();
  const [disable, setDisabled] = useState(true);
  const [editBtn, setEditBtn] = useState("Edit");

  const fetchStudent = async () => {
    const studentid = location.state.studentid;
    const response = await axiosAuth.get("/student/" + studentid);
    return response.data;
  };

  const validationSchema = Yup.object().shape({
    // gender: Yup.string().required("*Gender is required field."),
    f_name: Yup.string().required("*First name cannot be empty."),
    m_name: Yup.string(),
    l_name: Yup.string().required("*Last name cannot be empty."),
    phone: Yup.number().integer().required("*Phone no cannot be empty."),
    email: Yup.string().email(),
    dob: Yup.date().required("*DOB is required field."),
    town_city: Yup.string().required("*town/city is required field."),
    postal: Yup.number()
      .integer()
      .typeError("*Postal code must be a number")
      .required(
        "*Postal code is required field. (put 0 incase you do not know)"
      ),
    state: Yup.string().required("*State is required field."),
    country: Yup.string().required("*Country is required field."),
  });

  const onUpdateSubmit = async (data) => {
    console.log(validationSchema);

    setDisabled(true);
    setEditBtn("Edit");
    // console.log(" === >", data);
  };

  const { data, status } = useQuery("student", fetchStudent);

  const editBtnClick = () => {
    setDisabled(false);
    setEditBtn("Update");
  };

  const cancelClick = () => {
    setDisabled(true);
    setEditBtn("Edit");
  };

  return (
    <>
      {status === "error" && <p>Error fetching data</p>}
      {status === "loading" && <p>Fetching data...</p>}
      {status === "success" && (
        <div>
          {/* <h1>{data.full_name}</h1> */}
          <div className="view-student">
            <div className="basic-info">
              <div
                className="card-image"
                style={{ width: "200px", marginRight: "20px" }}
              >
                <img src="/images/avatar.jpg" />
              </div>

              <Formik
                initialValues={data}
                onSubmit={onUpdateSubmit}
                validationSchema={validationSchema}
              >
                {({ values, setFieldValues }) => (
                  <Form
                    encType="application/json"
                    style={{ width: "auto", margin: 0 }}
                  >
                    <h3 className="form-title">Basic Info</h3>
                    <div className="from-section grid-form">
                      <label htmlFor="f_name">First Name: </label>

                      <Field
                        type="text"
                        autoComplete="off"
                        className="input"
                        name="f_name"
                        disabled={disable}
                      />

                      <label htmlFor="m_name">Middle Name: </label>

                      <Field
                        type="text"
                        autoComplete="off"
                        className="input"
                        name="m_name"
                        disabled={disable}
                      />

                      <label htmlFor="l_name">Last Name: </label>
                      <Field
                        type="text"
                        autoComplete="off"
                        className="input"
                        name="l_name"
                        disabled={disable}
                      />

                      <label htmlFor="l_name">DOB: </label>
                      <Field
                        type={disable ? "text" : "date"}
                        autoComplete="off"
                        className="input"
                        name="dob"
                        value={data["dob"].split("T")[0]}
                        disabled={disable}
                      />

                      <label htmlFor="email">email: </label>
                      <Field
                        type="email"
                        autoComplete="off"
                        className="input"
                        name="email"
                        disabled={disable}
                      />

                      <label htmlFor="phone">Phone: </label>
                      <Field
                        type="number"
                        autoComplete="off"
                        className="input"
                        name="phone"
                        disabled={disable}
                      />
                    </div>

                    <div
                      className="err"
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      <ErrorMessage
                        className="err-msg"
                        name="f_name"
                        component="span"
                      ></ErrorMessage>
                      <ErrorMessage
                        className="err-msg"
                        name="l_name"
                        component="span"
                      ></ErrorMessage>
                      <ErrorMessage
                        className="err-msg"
                        name="dob"
                        component="span"
                      ></ErrorMessage>
                      <ErrorMessage
                        className="err-msg"
                        name="email"
                        component="span"
                      ></ErrorMessage>
                      <ErrorMessage
                        className="err-msg"
                        name="phone"
                        component="span"
                      ></ErrorMessage>
                    </div>

                    <h3 className="form-title">Address</h3>
                    <div className="from-section grid-form">
                      <label htmlFor="town/city">Town/City: </label>

                      <Field
                        type="text"
                        autoComplete="off"
                        className="input"
                        name="town_city"
                        disabled={disable}
                      />

                      <label htmlFor="state">State: </label>

                      <Field
                        type="text"
                        autoComplete="off"
                        className="input"
                        name="state"
                        disabled={disable}
                      />

                      <label htmlFor="postal">Postal code: </label>
                      <Field
                        type="text"
                        autoComplete="off"
                        className="input"
                        name="postal"
                        disabled={disable}
                      />

                      <label htmlFor="country">Country: </label>
                      <Field
                        type="text"
                        autoComplete="off"
                        className="input"
                        name="country"
                        disabled={disable}
                      />
                    </div>

                    <div
                      className="err"
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      <ErrorMessage
                        className="err-msg"
                        name="town_city"
                        component="span"
                      ></ErrorMessage>
                      <ErrorMessage
                        className="err-msg"
                        name="state"
                        component="span"
                      ></ErrorMessage>
                      <ErrorMessage
                        className="err-msg"
                        name="postal"
                        component="span"
                      ></ErrorMessage>
                      <ErrorMessage
                        className="err-msg"
                        name="country"
                        component="span"
                      ></ErrorMessage>
                    </div>

                    <div
                      className="form-row"
                      style={{
                        textAlign: "right",
                        // display: "flex",
                        // justifyContent: "flex-end",
                        marginTop: "10px",
                      }}
                    >
                      {auth.role === "admin" ? (
                        <>
                          <input
                            style={{ width: "auto" }}
                            className={disable ? "d-btn" : "c-btn"}
                            type={!disable ? "button" : "submit"}
                            value={editBtn}
                            onClick={(e) => editBtnClick()}
                          />

                          <input
                            style={{
                              visibility: disable ? "hidden" : "visible",
                              width: disable ? "0px" : "auto",
                              backgroundColor: "transparent",
                              border: "none",
                              boxShadow: "none",
                              color: "red",
                            }}
                            className="d-btn"
                            type="reset"
                            value="cancel"
                            onClick={(e) => cancelClick()}
                          />
                        </>
                      ) : null}
                    </div>
                  </Form>
                )}
              </Formik>
            </div>

            <h3 className="form-title">Course Taken</h3>

            <div className="from-section">
              <table
                className="table table-striped hover text-center"
                size="sm"
                style={{ fontSize: "13px" }}
              >
                <thead>
                  <tr>
                    <th scope="col">Sl no</th>
                    <th scope="col">Course</th>
                    <th scope="col">Department</th>
                    <th scope="col">Batch</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {data.Batches.map((data, index) => (
                    <tr key={index}>
                      {[
                        <th scope="row" key={index + 1}>
                          {index + 1}
                        </th>,

                        Object.entries(data).map((values) =>
                          values[0] === "Course"
                            ? Object.entries(values[1]).map((course) =>
                                course[0] === "course_id" ? null : (
                                  <td key={course[1]}>{course[1]}</td>
                                )
                              )
                            : null
                        ),

                        <td id="batch-date" key={data["start_period"]}>
                          {data["start_period"].split("T")[0] +
                            " - " +
                            data["end_period"].split("T")[0]}
                        </td>,

                        <td key={"action" + index}>
                          <button>n/a</button>
                          <button>n/a</button>
                        </td>,
                      ]}
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="">
                <button  style={{ width: "220px" }} className="c-btn">Add Course</button>
              </div>
              
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default ShowStudent;
