import { React, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Modal, Button } from "react-bootstrap";
import * as Yup from "yup";
import { useQuery } from "react-query";

import './course.css'

import useAxiosInterceptor from "../../hook/useAxiosInterceptor";
import useContextAuth from "../../hook/useContextAuth";
import CourseList from "./CourseList";
import Footer from "../Footer/Footer";

const Course = () => {
  const { auth } = useContextAuth();
  const axiosAuth = useAxiosInterceptor();
  const [courseID, setCourseID] = useState(null);

  // Get Course Request
  const getCourse = async () => {
    return await axiosAuth
      .get("/course")
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err.response.data.json();
      });
  };

  // usequery state to fetch course
  const { data, status } = useQuery("course", getCourse);

  const initialValues = {
    course: "",
    department: "",
    description: "",
  };

  let oldValues = {
    id: courseID === null ? "" : data[courseID]["id"],
    course: "",
    department: "",
    description: "",
  };

  const validationUpdateSchema = Yup.object().shape({
    department: Yup.string(),
    course: Yup.string(),
    description: Yup.string(),
  });

  const validationSchema = Yup.object().shape({
    department: Yup.string().required("*Department is required field."),
    course: Yup.string().required("*Course is required field."),
    description: Yup.string(),
  });

  // Add Course Post Request
  const onSubmitCourse = async (course_data, { resetForm }) => {
    course_data.userid = auth.id;
    await axiosAuth
      .post("/course/register", course_data)
      .then((response) => {
        resetForm(initialValues);
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Update Course Post Request
  const onUpdateCourse = (data) => {
    data.userid = auth.id;
    if (
      !data["course"].length &&
      !data["department"].length &&
      !data["description"].length
    ) {
      console.log("No update were made");
    } else {
      axiosAuth
        // .post("http://localhost:8080/course/update", data)
        .post("/course/update", data)
        .then((response) => {
          console.log(response.data);
          // window.location.reload(false);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }
  };

  // Modal Contoller
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const handleShow = (e, id) => {
    e.preventDefault();
    setCourseID(id);
    setShow(true);
  };

  // Delete Request
  const handleDelete = (e, key) => {
    axiosAuth
      .delete("/course/remove/" + data[key]["id"], { userid: auth.id })
      .then((response) => {
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  return (
    <>
      <div className="px-5 course">
        {/* modal launched when update */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>

          <Formik
            initialValues={oldValues}
            onSubmit={onUpdateCourse}
            validationSchema={validationUpdateSchema}
          >
            {({ values, setFieldValue }) => (
              <Form style={{ width: "100%" }}>
                <Modal.Body>
                  <div className="form-row">
                    <div className="form-item">
                      <label htmlFor="department">Department</label>
                    </div>
                    <div className="form-item">
                      <Field
                        type="text"
                        placeholder={data[courseID]["department"]}
                        className="inp"
                        name="department"
                      />
                    </div>
                    <div className="form-item err">
                      <ErrorMessage
                        className="err-msg"
                        name="department"
                        component="span"
                      ></ErrorMessage>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-item">
                      <label htmlFor="course">Course</label>
                    </div>
                    <div className="form-item">
                      <Field
                        type="text"
                        placeholder={data[courseID]["course"]}
                        className="inp"
                        name="course"
                      />
                    </div>
                    <div className="form-item err">
                      <ErrorMessage
                        className="err-msg"
                        name="course"
                        component="span"
                      ></ErrorMessage>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-item">
                      <label htmlFor="course">Description</label>
                    </div>
                    <div className="form-item">
                      <textarea
                        className="text-area"
                        placeholder={data[courseID]["description"]}
                        onChange={(e) =>
                          setFieldValue("description", e.target.value)
                        }
                      ></textarea>
                    </div>
                    <div className="form-item err">
                      <ErrorMessage
                        className="err-msg"
                        name="description"
                        component="span"
                      ></ErrorMessage>
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" type="submit">
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Form>
            )}
          </Formik>
        </Modal>

        {/* course */}
        <h1 className="title text-center">Courses</h1>

        {status === "error" && <p>Error! fetching data</p>}
        {status === "loading" && <p>Fetching coure list...</p>}
        {status === "success" && (
          <CourseList
            courseList={data}
            user={auth.role}
            handleShow={handleShow}
            handleDelete={handleDelete}
          />
        )}

        {/* Add coure form starts from here is user is admin */}
        {auth.role === "admin" ? 
          <>
            <h1 className="title text-center">Add New Course</h1>
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmitCourse}
              validationSchema={validationSchema}
            >
              {({ values, setFieldValue }) => (
                <Form>
                  {/* Course, department and batch*/}
                  <div className="form-section">
                    <h3 className="form-title">Course Information</h3>

                    <div className="form-row">
                      <div className="form-item">
                        <label htmlFor="department">Department</label>
                        <label htmlFor="course">Select Course</label>
                      </div>

                      <div className="form-item">
                        <Field
                          type="text"
                          placeholder="Enter department name"
                          className="inp"
                          name="department"
                        />

                        <Field
                          className="inp"
                          type="text"
                          name="course"
                          placeholder="Enter course name"
                        />
                      </div>

                      <div className="form-item err">
                        <ErrorMessage
                          className="err-msg"
                          name="department"
                          component="span"
                        ></ErrorMessage>
                        <ErrorMessage
                          className="err-msg"
                          name="course"
                          component="span"
                        ></ErrorMessage>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-item">
                        <label htmlFor="description">Description</label>
                      </div>

                      <div className="form-item">
                        <textarea
                          className="text-area"
                          value={values.description}
                          onChange={(e) =>
                            setFieldValue("description", e.target.value)
                          }
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="form-row" style={{ textAlign: "center" }}>
                    <input
                      style={{ width: "220px" }}
                      className="c-btn"
                      type="submit"
                      value="Submit Application"
                    />
                  </div>
                </Form>
              )}
            </Formik>
          </>
        : null}
      </div>

      <Footer/>
    </>
  );
};

export default Course;
