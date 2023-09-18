import { React } from "react";

import useAxiosInterceptor from "../../hook/useAxiosInterceptor";
import { useAxiosInterceptorMultipart } from "../../hook/useAxiosInterceptor";
import useContextAuth from "../../hook/useContextAuth";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import PreviewImage from "./PreviewImage";
import { useQuery } from "react-query";
import Footer from "../Footer/Footer";

const Student = () => {
  const {auth} = useContextAuth()
  const axiosAuth = useAxiosInterceptor();
  const axiosAuthMultiPart = useAxiosInterceptorMultipart();

  // Get Course Request
  const getCourse = async () => {
    const res = await axiosAuth
      .get("/course")
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err.response.data.json();
      });
    return res;
  };

  // usequery state to fetch course
  const { data, status } = useQuery("course", getCourse);

  const initialValues = {
    gender: "",
    f_name: "",
    m_name: "",
    l_name: "",
    phone: "",
    email: "",
    dob: "",
    town_city: "",
    postal: "",
    state: "",
    country: "",
    course: "",
    start_period: "",
    end_period: "",
    photo: null,
  };

  const validationSchema = Yup.object().shape({
    gender: Yup.string().required("*Gender is required field."),
    f_name: Yup.string().required("*First name is required field."),
    m_name: Yup.string(),
    l_name: Yup.string().required("*Last name is required field."),
    phone: Yup.number().integer().required("*Phone number is required field."),
    email: Yup.string().email(),
    dob: Yup.date().required("*DOB is required field."),
    town_city: Yup.string().required("*town/city is required field."),
    postal: Yup.number()
      .integer()
      .required(
        "*Postal code is required field. (put 0 incase you do not know)"
      ),
    state: Yup.string().required("*State is required field."),
    country: Yup.string().required("*Country is required field."),
    course: Yup.number().integer().required("*Course is required field."),
    start_period: Yup.date().required("*Batch start date is required field."),
    end_period: Yup.date().required("*Batch end date is required field."),
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

  const onSubmit = async (student_data, { resetForm }) => {
    student_data.userid = auth.id
    await axiosAuthMultiPart
      .post("/student/register", student_data)
      .then((response) => {
        console.log(response.data)
        resetForm(initialValues);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div>
        <h1 className="title text-center">Add Student</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({ values, setFieldValue }) => (
            <Form encType="multipart/form-data">
              {/* Course, department and batch*/}
              <div className="form-section">
                <h3 className="form-title">Course Information</h3>

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
                    <label htmlFor="batch">Select Coures Duration</label>
                  </div>
                  <div className="form-item">
                    <label htmlFor="batch">start date</label>
                    <label htmlFor="batch">end date</label>
                  </div>
                  <div className="form-item">
                    <Field
                      className="inp"
                      type="date"
                      name="start_period"
                      placeholder="Start Month"
                    />
                    <Field
                      className="inp"
                      name="end_period"
                      type="date"
                      placeholder="end Month"
                    />
                  </div>
                  <div className="form-item err">
                    <ErrorMessage
                      className="err-msg"
                      name="start_period"
                      component="span"
                    ></ErrorMessage>
                    <ErrorMessage
                      className="err-msg"
                      name="end_period"
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
                    <label htmlFor="name">Student Name</label>
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
                      type="number"
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
                    <label htmlFor="name">DOB</label>
                    <label>Select Gender</label>
                  </div>
                  <div className="form-item">
                    <Field
                      className="inp"
                      type="date"
                      name="dob"
                      placeholder="Date of Birth"
                    />
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
                      name="dob"
                      component="span"
                    ></ErrorMessage>
                    <ErrorMessage
                      className="err-msg"
                      name="gender"
                      component="span"
                    ></ErrorMessage>
                  </div>
                </div>

                {/* Form row for Address */}
                <div className="form-row">
                  <div className="form-item">
                    <label htmlFor="address">Address</label>
                  </div>

                  <div className="form-item">
                    <Field
                      className="inp"
                      name="town_city"
                      autoComplete="off"
                      type="text"
                      placeholder="Town/City"
                    />

                    <Field
                      className="inp"
                      type="number"
                      name="postal"
                      autoComplete="off"
                      placeholder="Postal Address"
                    />

                    <Field
                      className="inp"
                      name="state"
                      type="text"
                      autoComplete="off"
                      placeholder="State"
                    />

                    <Field
                      name="country"
                      className="inp"
                      type="text"
                      placeholder="Country"
                    />
                  </div>
                  <div className="form-item err">
                    <ErrorMessage
                      className="err-msg"
                      name="town_city"
                      component="span"
                    ></ErrorMessage>
                    <ErrorMessage
                      className="err-msg"
                      name="postal"
                      component="span"
                    ></ErrorMessage>
                    <ErrorMessage
                      className="err-msg"
                      name="state"
                      component="span"
                    ></ErrorMessage>
                    <ErrorMessage
                      className="err-msg"
                      name="country"
                      component="span"
                    ></ErrorMessage>
                  </div>
                </div>
              </div>

              {/* Photo */}
              <div className="form-section">
                <h3 className="form-title">Student Photo</h3>
                {/* Form row for Photo */}
                <div className="form-row">
                  <div className="form-item" style={{ justifyItems: "center" }}>
                    {/* <img
                    id="photo"
                    src={
                      values.phone === null
                        ? "avatar.jpg"
                        : URL.createObjectURL(avatar)
                    }
                    alt="Profile Avatar"
                    name="avatar"
                  /> */}
                    {values.photo && <PreviewImage file={values.photo} />}
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-item">
                    <input
                      className="inp"
                      type="file"
                      name="photo"
                      accept="image/*"
                      onChange={(e) =>
                        setFieldValue("photo", e.target.files[0])
                      }
                      multiple
                    />
                  </div>
                </div>

                <div className="form-item err">
                  <ErrorMessage
                    className="err-msg"
                    name="photo"
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

export default Student;
