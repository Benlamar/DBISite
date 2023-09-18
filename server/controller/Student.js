const { Students, Batch, Course, sequelize } = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const StudentList = async (req, res) => {
  const searchQuery = req.body;

  // let courseQuery = {
  //   model: Course,
  //   where:{course:'CCA'},
  //   attributes: [["id", "course_id"], "course", "department"],
  // }

  // let batchQuery = {
  //   model: Batch,
  //   attributes: [["id", "batch_id"], "start_period", "end_period"],
  //   include: [ courseQuery ],
  // }

  // let studentQuery = {
  //   attributes: [
  //     [
  //       sequelize.fn( "CONCAT", sequelize.col("f_name"),
  //         " ", sequelize.col("m_name"),
  //         " ", sequelize.col("l_name") ),
  //       "full_name",
  //     ],
  //     ["id", "student_id"], "gender", "dob", "phone",
  //     "email", "town_city", "postal", "state", "country",
  //     "photo", "createdAt",
  //   ],

  //   include: [ batchQuery ],
  // }

  //////////////////////////////////////
  let courseQuery = {
    model: Course,
    attributes: [["id", "course_id"], "course", "department"],
  };

  let studentQuery = {
    model: Students,
    attributes: [
      [
        sequelize.fn(
          "CONCAT",
          sequelize.col("f_name"),
          " ",
          sequelize.col("m_name"),
          " ",
          sequelize.col("l_name")
        ),
        "full_name",
      ],
      ["id", "student_id"],
      "gender",
      "dob",
      "phone",
      "email",
      "town_city",
      "postal",
      "state",
      "country",
      "photo",
      "createdAt",
    ],

    // include: [ batchQuery ],
  };

  let batchQuery = {
    model: Batch,
    attributes: [["id", "batch_id"], "start_period", "end_period"],
    include: [studentQuery, courseQuery],
  };

  // where condition
  if (searchQuery["course"]) {
    courseQuery.where = { course: searchQuery["course"] };
  }

  if (searchQuery["name"]) {
    studentQuery.where = {
      [Op.or]: [{ f_name: searchQuery["name"] }, 
        { m_name: searchQuery["name"] }, 
        { l_name: searchQuery["name"] }],
    };
  }

  let studentList = await Batch.findAll(batchQuery);
  // console.log("++++.>",studentList)

  res.json(studentList);
};

const StudentByID = async (req, res) => {
  const studentId = req.params.studentid;

  await Students.findByPk(studentId, {
    include: [
      {
        model: Batch,
        attributes: [["id", "batch_id"], "start_period", "end_period"],
        include: [
          {
            model: Course,
            attributes: [["id", "course_id"], "course", "department"],
          },
        ],
      },
    ],
  })
    .then((result) => {
      if (!result) {
        return res.status(404).json("Student do not exist!");
      }
      return res.status(200).json(result);
    })
    .catch((err) => {
      return res.status(500).json("Failed!", err);
    });
};

const RegisterStudent = async (req, res) => {
  const student = req.body;
  // console.log(req);
  if (!req.file) {
    student["photo"] = "avatar.jpg";
  } else {
    student["photo"] = req.file.filename;
  }

  await Students.create(student).then((r) => {
    const batch = {
      start_period: student["start_period"],
      end_period: student["end_period"],
      studentId: r.id,
      courseId: parseInt(student["course"]),
    };
    Batch.create(batch);
  });
  res.json("Student Added Successfully");
};

module.exports = {
  StudentList,
  StudentByID,
  RegisterStudent,
};
