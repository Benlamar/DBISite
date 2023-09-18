const express = require("express");
const router = express.Router();
const Course = require('../controller/Course')
const verifyToken = require('../middleware/VerifyToken')
const isAdmin = require("../middleware/IsAdmin")

router.get("/", verifyToken, Course.CourseList);

router.post("/register", verifyToken, isAdmin, Course.RegisterCourse);

router.post("/update", verifyToken, isAdmin, Course.UpdateCourse);

router.delete("/remove/:id", verifyToken, isAdmin, Course.DeleteCourse);

module.exports = router;
