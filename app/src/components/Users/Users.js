import { React } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useQuery } from "react-query";

import useAxiosInterceptor from "../../hook/useAxiosInterceptor";
import { useAxiosInterceptorMultipart } from "../../hook/useAxiosInterceptor";
import useContextAuth from "../../hook/useContextAuth";

import PreviewImage from "../Student/PreviewImage";
import Footer from "../Footer/Footer";

const Users = () => {
  const {auth} = useContextAuth()
  const axiosAuth  = useAxiosInterceptor()
  const axiosAuthMultiPart = useAxiosInterceptorMultipart()

  // Get Course Request
  const getCourse = async() => {
    return await axiosAuth
      .get("/course")
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        return err.response.data.json()
      });
  };

  const { data, status } = useQuery("course", getCourse);

  const initialValues = {
    gender: "",
    f_name: "",
    m_name: "",
    l_name: "",
    phone: "",
    email: "",
    course: "",
    start_month: "",
    permission: "",
    password: "",
    photo: null,
  };

  const validationSchema = Yup.object().shape({
    gender: Yup.string().required("*Gender is required field."),
    f_name: Yup.string().required("*First name is required field."),
    m_name: Yup.string(),
    l_name: Yup.string().required("*Last name is required field."),
    phone: Yup.number().integer().required("*Phone number is required field."),
    email: Yup.string().email().required("*email is required field."),
    
    course: Yup.string().required("*Course is required field."),
    permission: Yup.string().required("*Permission is required field."),
    start_month: Yup.date(),
    password: Yup.string()
      .required("Enter Password")
      .min(4, "password must be atleast 4 letter length"),
    photo: Yup.mixed()
      .nullable()
      .test("fileType", "Invalid file type", (value) => {
        if (value === null) {
          // console.log("Empty image");
          return true;
        }
        return (
          value &&
          (value.type === "image/jpeg" ||
            value.type === "image/jpg" ||
            value.type === "image/bmp" ||
            value.type === "image/png")
        );
      }),
  });

  const onSubmit = async(user_data, { resetForm }) => {
    user_data.userid = auth.id
    await axiosAuthMultiPart
      .post("/user/register", user_data)
      .then((response) => {
        console.log(response.data)
        resetForm(initialValues, (initialValues.photo = null));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div>
        <h1 className="title text-center">Add User</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({ values, setFieldValue }) => (
            <Form>
              {/* Course, department and batch*/}
              <div className="form-section">
                <h3 className="form-title">Work Information</h3>

                <div className="form-row">
                  <div className="form-item">
                    <label htmlFor="course">Select Course</label>
                  </div>

                  <div className="form-item">
                  {status === "error" && (
                      <Field as="select" className="inp" name="course">
                        <option value="">error cannot fetch course</option>
                      </Field>
                    )}
                    {status === "loading" && (
                      <Field as="select" className="inp" name="course">
                        <option value="">fetching course...</option>
                      </Field>
                    )}
                    {status === "success" && (
                      <Field as="select" className="inp" name="course">
                        <option value="">--</option>
                        {data.map((data, key) => (
                          <option key={key} value={data["id"]}>
                            {data["course"]}
                          </option>
                        ))}
                      </Field>
                    )}
                  </div>

                  <div className="form-item err">
                    <ErrorMessage
                      className="err-msg"
                      name="course"
                      component="span"
                    ></ErrorMessage>
                  </div>
                </div>

                {/* Select Batch */}
                <div className="form-row">
                  <div className="form-item">
                    <label htmlFor="batch">Joining Date</label>
                    <label htmlFor="permission">Permission</label>
                  </div>
                  <div className="form-item">
                    <Field className="inp" type="date" name="start_month" />
                    <div role="group" className="inp-group">
                      <Field
                        type="radio"
                        className="radio-inp"
                        name="permission"
                        value="admin"
                      />
                      <label className="m-0" htmlFor="Male">
                        Admin
                      </label>
                      <Field
                        type="radio"
                        className="radio-inp"
                        name="permission"
                        value="user"
                      />
                      <label className="m-0" htmlFor="female">
                        User
                      </label>
                    </div>
                  </div>
                  <div className="form-item err">
                    <ErrorMessage
                      className="err-msg"
                      name="start_month"
                      component="span"
                    ></ErrorMessage>
                  </div>
                </div>

                {/* password */}
                <div className="form-row">
                  <div className="form-item">
                    <label htmlFor="password">Password</label>
                  </div>
                  <div className="form-item">
                    <Field className="inp" type="password" name="password" />
                  </div>
                  <div className="form-item err">
                    <ErrorMessage
                      className="err-msg"
                      name="password"
                      component="span"
                    ></ErrorMessage>
                  </div>
                </div>
              </div>

              {/* Form section basic info*/}
              <div className="form-section">
                <h3 className="form-title">Basic Information</h3>
                {/* For name field */}
                <div className="form-row">
                  <div className="form-item">
                    <label htmlFor="name">User Name</label>
                  </div>
                  <div className="form-item">
                    <Field
                      autoComplete="off"
                      className="inp"
                      name="f_name"
                      type="text"
                      placeholder="First Name"
                    />
                    <Field
                      className="inp"
                      autoComplete="off"
                      type="text"
                      name="m_name"
                      placeholder="Middle Name (Optional)"
                    />
                    <Field
                      className="inp"
                      autoComplete="off"
                      name="l_name"
                      type="text"
                      placeholder="Last Name"
                    />
                  </div>
                  <div className="form-item err">
                    <ErrorMessage
                      className="err-msg"
                      name="f_name"
                      component="span"
                    ></ErrorMessage>
                    <ErrorMessage
                      className="err-msg"
                      name="m_name"
                      component="span"
                    ></ErrorMessage>
                    <ErrorMessage
                      className="err-msg"
                      name="l_name"
                      component="span"
                    ></ErrorMessage>
                  </div>
                </div>

                {/* Form row for Phone and email */}
                <div className="form-row">
                  <div className="form-item">
                    <label htmlFor="name">Phone No</label>
                    <label htmlFor="email">Email</label>
                  </div>
                  <div className="form-item">
                    <Field
                      className="inp"
                      name="phone"
                      autoComplete="off"
                      type="tel"
                      placeholder="Phone no"
                    />
                    <Field
                      className="inp"
                      name="email"
                      autoComplete="off"
                      type="email"
                      placeholder="Email ID"
                    />
                  </div>

                  <div className="form-item err">
                    <ErrorMessage
                      className="err-msg"
                      name="phone"
                      component="span"
                    ></ErrorMessage>
                    <ErrorMessage
                      className="err-msg"
                      name="email"
                      component="span"
                    ></ErrorMessage>
                  </div>
                </div>

                {/* Form row for DOB & Gender */}
                <div className="form-row">
                  <div className="form-item">
                    <label>Select Gender</label>
                  </div>
                  <div className="form-item">
                    <div role="group" className="inp-group">
                      <Field
                        type="radio"
                        className="radio-inp"
                        name="gender"
                        value="male"
                      />
                      <label className="m-0" htmlFor="Male">
                        Male
                      </label>
                      <Field
                        type="radio"
                        className="radio-inp"
                        name="gender"
                        value="female"
                      />
                      <label className="m-0" htmlFor="female">
                        Female
                      </label>
                    </div>
                  </div>

                  <div className="form-item err">
                    <ErrorMessage
                      className="err-msg"
                      name="gender"
                      component="span"
                    ></ErrorMessage>
                  </div>
                </div>
              </div>

              {/* Photo */}
              <div className="form-section">
                <h3 className="form-title">User Photo</h3>
                {/* Form row for Photo */}
                <div className="form-row">
                  <div className="form-item" style={{ justifyItems: "center" }}>
                    {values.photo && <PreviewImage file={values.photo} />}
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-item">
                    <input
                      className="inp"
                      type="file"
                      name="photo"
                      onChange={(e) =>
                        setFieldValue("photo", e.target.files[0])
                      }
                    />
                  </div>
                </div>

                <div className="form-item err">
                  <ErrorMessage
                    className="err-msg"
                    name="image"
                    component="span"
                  ></ErrorMessage>
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
      </div>

      <Footer/>
    </>
  );
};

export default Users;
