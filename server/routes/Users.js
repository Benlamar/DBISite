const express = require("express");
const router = express.Router();
const multer = require("multer");
const User = require("../controller/User");

const verifyToken = require('../middleware/VerifyToken')
const isAdmin = require("../middleware/IsAdmin")


const bcrypt = require("bcryptjs");

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

//image storage
const imageUpload = multer({ storage: fileStorage });

router.get("/", verifyToken, isAdmin, User.UserList);

router.post("/register", verifyToken, isAdmin, imageUpload.single("photo"), User.RegisterUser);

module.exports = router;
