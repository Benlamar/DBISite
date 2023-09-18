const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { Users } = require("../models");

const bcrypt = require("bcryptjs");

// here, for login no controller will be created since it has only one request method

router.post("/", async (req, res) => {
  const user_email = req.body.email;
  const password = req.body.password;
  try {
    const user = await Users.findOne({ where: { email: user_email } });
    // check if user exist in DB
    if (!user) {
      return res.status(400).json("Email id do not exist!");
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(400).json("Invalid credentials!");
    } else {
      // creaeting json web token
      const access_token = jwt.sign({
        username: user.f_name + " " + (user.m_name ? user.m_name + " "+ user.l_name : user.l_name),
        permission: user.permission,
      }, process.env.ACCESS_TOKEN, {expiresIn: '1h'});

      const refresh_token = jwt.sign({
        username: user.f_name + " " + (user.m_name ? user.m_name + " "+ user.l_name : user.l_name),
        permission: user.user,
      }, process.env.REFRESH_TOKEN, {expiresIn: '1d'});

      // updating the refresh token in the user's table as well
      const update_token_db = await Users.update({token: refresh_token}, {where:{
        id:user.id
      }})
      if(update_token_db){
        return res.cookie('token', refresh_token, { httpOnly: true, sameSite: 'None', secure:true,  maxAge: 24 * 60 * 60 * 1000 }) //sameSite: 'None', secure:true
         .status(200).json({token:access_token, id:user.id, user:user.f_name, role:user.permission});
      }
      else{
        throw("Cannot update token!")
      }
    }
  } catch (err) {
    // console.log(err)
    return res.status(500).json("Error! cannot perform operation");
  }
});


module.exports = router;