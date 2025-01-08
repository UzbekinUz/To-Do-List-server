const moment = require('moment/moment');

module.exports = require('mongoose').model('Lists',{
    userId:String,
    name:String,
    status:{
        type:Boolean,
        default:false
    },
    date:{
        type: String,
        default: moment().format('LLL')
    },
    update:{
        type:String,
        default:moment().format('LLL')
    }
});