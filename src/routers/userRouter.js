const user = require('../controllers/user');
const authWare = require('../middlewares/authWare');

module.exports=require('express')()
.post('/signup',user.up)
.post('/signin',user.in)
.get('/getuser',user.get)
.get('/check',authWare,user.check)
