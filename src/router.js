module.exports=require('express')()
.use('/user', require('./routers/userRouter'))
.use('/list', require('./routers/listRouter'))