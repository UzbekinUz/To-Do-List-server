const list = require('../controllers/list');

module.exports = require('express')()
.post('/additem', list.add)
.put('/updateitem' , list.put)
.delete('/deleteitem' , list.del)
.get('/getitem' , list.get)
