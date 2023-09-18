const express = require("express");
const router = express.Router();
const multer = require("multer");
const Student = require("../controller/Student")
const verifyToken = require('../middleware/VerifyToken')
// const isAdmin = require("../middleware/IsAdmin")

//initializing file storage to destination
const fileStorage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, "./public/images");
  },
  filename: (req, file, cd) => {
    type = file.mimetype.split("/")[1]; //extracting the file type from file
    cd(
      null,
      Date.now() +
        "_" +
        req.body["f_name"] +
        "_" +
        req.body["m_name"] +
        "_" +
        req.body["l_name"] +
        "." +
        type
    );
  },
});

//image storage middleware
const imageUpload = multer({ storage: fileStorage });

router.post("/", verifyToken, Student.StudentList);

router.get("/:studentid", verifyToken, Student.StudentByID);

router.post("/register", verifyToken, imageUpload.single("photo"), Student.RegisterStudent);

// router.post("/update", )

module.exports = router;
