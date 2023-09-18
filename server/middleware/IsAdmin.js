const { Users } = require("../models");

const isAdmin = async (req, res, next) => {
  user = await Users.findByPk(req.body.userid);
  if (!user) {
    return res.status(403).json("Unknown user");
  } else {
    if (user.permission === "admin") {
      next();
      return;
    } else {
      return res.status(403).json("Unauthorize request");
    }
  }
};

module.exports = isAdmin;
