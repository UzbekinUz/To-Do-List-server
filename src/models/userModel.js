const moment = require('moment/moment');

module.exports = require('mongoose').model('user',{
    user_name:String,
    password:String,
    access_token: {
        type: String,
        default: 'none'
    },
    date:{
        type: String,
        default: moment().format('LLL')
    }
})