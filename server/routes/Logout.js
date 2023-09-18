const express = require("express");
const router = express.Router();
const { Users } = require("../models");

// here, for login no controller will be created since it has only one request method
router.get("/", async (req, res) => {
  const cookies = req.cookies;
  if (!cookies) return res.sendStatus(403);
  const refresh_token = cookies.token;

  console.log("logout", refresh_token)
  if (refresh_token) {
    const user = await Users.findOne({ where: { token: refresh_token } });
    if (!user) {
      res.clearCookie("token", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
      return res.status(404);
    } else {
      const update_token_db = await Users.update(
        { token: null },
        {
          where: {
            id: user.id,
          },
        }
      );
      res.clearCookie("token", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
      return res.sendStatus(204);
    }
  }
  else{
    return res.sendStatus(403);
  }
});

module.exports = router;
