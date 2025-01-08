const userModel = require("../models/userModel");
const JWT = require("jsonwebtoken");

module.exports = {
    up: async (req, res) => {
        const { user_name, password, repassword } = req.body;
        if (!user_name || !password || !repassword) {
            res.send({
                suc: false,
                msg: "Not competed!"
            });
        } else {
            const $user = await userModel.findOne({ user_name })
            if ($user) {
                res.send({
                    suc: false,
                    msg: "Username is not available!"
                });
            } else {
                if (password.length < 8) {
                    res.send({
                        suc: false,
                        msg: "Password should contain at least 8 charecters!"
                    });
                } else if (password.length < 8) {
                    res.send({
                        suc: false,
                        msg: "Password should contain at least 8 charecters!"
                    });
                } else if (repassword !== password) {
                    res.send({
                        suc: false,
                        msg: "Passwords are not equel!"
                    }); 
                } else {


                    new userModel({
                        user_name,
                        password
                    }).save().then(($saved_user) => {

                        const userId = $saved_user._id;

                        const token = JWT.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '10d' });

                        $saved_user.set({ access_token: token }).save()
                        res.send({
                            suc: true,
                            msg: "Competed!",
                        });
                    })
                }
            }
        }
    },
    get: async (req, res) => {
        const data = await userModel.find()
        res.send({
            data
        })
    },
    check: (req, res) => {
        res.send({
            success: true,
            userInfo: req.user
        })
    },
    in: (req, res) => {
        const { user_name, password } = req.body;
        if (!user_name || !password) {
            res.send({
                suc: false,
                msg: "Not competed!"
            });
        } else {
            userModel.findOne({ user_name }).then(result => {
                if (!result) {
                    res.send({
                        suc: false,
                        msg: "No user!"
                    });
                } else {
                    if (result.password == !password) {
                        res.send({
                            suc: false,
                            msg: "Incorrect password!"
                        });
                    } else {
                        const token = JWT.sign({ userId: result._id }, process.env.JWT_SECRET, { expiresIn: '10d' });
                        result.set({ access_token: token }).save();
                        res.send({
                            suc: true,
                            msg: "Welcome back!",
                            access_token: token
                        });
                    }
                }
            })
        }
    }
}