const JWT = require("jsonwebtoken");
const userModel = require("../models/userModel");
module.exports = (req, res, next) => {
  const token = req.headers["x-auth-token"];
  if (!token) {
    res.send({
      success: false,
      message: req.headers,
    });
  } else {
    JWT.verify(token, process.env.JWT_SECRET, async (err, payload) => {
      if (err) {
        res.send({
          success: false,
          message: "Sessiya vaqti tugagan! Qayta avtorizatsiya qiling!",
        });
      } else {
        const { userId } = payload;
        if (!userId) {
          res.send({
            success: false,
            message: "Hatolik. qayta avtorizatsiya qiling!",
          });
        } else {
          const $user = await userModel.findOne({ _id: userId });

          if (!$user) {
            res.send({
              success: false,
              message: "Hatolik. Foydalanuvchi profili o'chirilgan!",
            });
          } else if ($user.access_token !== token) {
            res.send({
              success: false,
              message: $user,
              token,
              token2: $user.access_token,
            });
          } else {
            const { user_name, password ,date,_id } = $user;
            req.user = { username:user_name, password,userId:_id,date };
            next();
          }
        }
      }
    });
  }
};
