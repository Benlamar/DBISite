const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { Users } = require("../models");

// here, for login no controller will be created since it has only one request method

router.get("/", async (req, res) => {
  const cookies = req.cookies;
  if (!cookies) return res.sendStatus(403);
  const refresh_token = cookies.token;

  if (refresh_token){
    const user = await Users.findOne({ where: { token: refresh_token } });

    if (!user) {
      res.clearCookie("token", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
      return res.sendStatus(404);
    } else {
      jwt.verify(refresh_token, process.env.REFRESH_TOKEN, (err, decode) => {
        if (err) return res.sendStatus(403);
        const access_token = jwt.sign({
          username: user.f_name + " " + (user.m_name ? user.m_name + " "+ user.l_name : user.l_name),
          permission: user.user,
        }, process.env.ACCESS_TOKEN, {expiresIn: '1h'});
  
        res.json({token:access_token, role:user.permission, id:user.id, user, user:user.f_name})
      });
    }
  }
  else{
    return res.sendStatus(403);
  }
  
});

module.exports = router;
