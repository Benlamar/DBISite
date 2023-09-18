const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config();

const db = require("./models");

//app
const app = express();

//required packages
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// cors
const corsOptions = require("./config/corsOption")
app.use(cors(corsOptions));
app.use(cookieParser());

//multer
const multer = require("multer");
upload = multer();

//static
// const dir = path.join(__dirname, 'public');
// app.use(express.static(dir));
app.use(express.static(__dirname));
// app.use(express.static('public'));
app.use('/images', express.static('images'));

//Routers
const studentRouter = require("./routes/Students");
app.use("/student", studentRouter);

const courseRouter = require("./routes/Course");
app.use("/course", courseRouter);

const userRouter = require("./routes/Users");
app.use("/user", userRouter);

const loginRouter = require("./routes/Login");
app.use("/login", loginRouter);

const logoutRouter = require("./routes/Logout");
app.use("/logout", logoutRouter);

const refreshRouter = require("./routes/RefreshToken");
app.use("/refresh", refreshRouter);

//listen to port
db.sequelize.sync().then(() => { //{force:true}
  app.listen(8080, () => {
    console.log("Listening ....");
  });
});
