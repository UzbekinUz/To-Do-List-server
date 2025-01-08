process.env.NODE_ENV!=='production'?require('dotenv').config({path: '.env'}):null;
const app = require('express')()
require('mongoose').connect(process.env.MongoDB).then(()=>console.log('Mongo ulandi'));
app.use(require('express-fileupload')());
app.use(require('express').json());
app.use(require('cors')({
    origin: "*"
}));
app.use('/images',require('express').static('images'))
app.use(require('./src/router'))
app.listen(process.env.APP_PORT,()=>{});