const { Course } = require("../models");

const CourseList = async (req, res) => {
  const courseList = await Course.findAll({
    attributes: ["id", "course", "department", "description"],
  });
  res.json(courseList);
};

const RegisterCourse = async (req, res) => {
  let course = req.body;
  course["department"] = course["department"].toUpperCase();
  await Course.create(course);
  res.json("Course Added Successfully");
};

// update the course is there are new changes
const UpdateCourse = async (req, res) => {
  let course = req.body;
  let updateData = {};

  if (course["department"].length) {
    updateData["department"] = course["department"];
  }
  if (course["course"].length) {
    updateData["course"] = course["course"];
  }
  if (course["description"].length) {
    updateData["description"] = course["description"];
  }
  const result = await Course.update(updateData, {
    where: {
      id: course["id"],
    },
  });

  if(result){
    return res.status(200).json("Course Updated Successfully");
  }else{
    return res.status(500).json("Failed");
  }
};


// delete a course by taking params from the request
const DeleteCourse = async (req, res) => {
  let course_id = req.params.id;
  await Course.destroy({ where: { id: course_id } });
  res.status(200).json("Course Deleted Successfully");
};

module.exports = {
  CourseList,
  RegisterCourse,
  UpdateCourse,
  DeleteCourse,
};
