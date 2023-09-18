const { Users } = require("../models");

const UserList = async (req, res) => {
  const userList = await Users.findAll();
  res.json(userList);
};

const RegisterUser = async (req, res) => {
  const user = req.body;
  if (!req.file) {
    user["photo"] = "avatar.jpg";
  } else {
    user["photo"] = req.file.filename;
  }
  var salt = bcrypt.genSaltSync(10);
  user["password"] = bcrypt.hashSync(user["password"], salt);
  await Users.create(user);
  res.json("User Added Successfully");
};

module.exports = { UserList, RegisterUser };
