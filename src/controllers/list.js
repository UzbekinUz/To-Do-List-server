const listModel = require("../models/listModel");

module.exports = {
    add:(req, res)=>{
        const{userId, name} = req.body;
        if (!userId || !name) {
            res.send({
                suc: false,
                msg: "Not competed!"
            });
        } else {
            new listModel({userId, name}).save().then(() => {
                res.send({
                    suc: true,
                    msg: "Competed!"
                });
            })
        }
    },
    put: async (req, res)=>{
        const {id} = req.query;
        const name = req.body?.name;
        const information = await listModel.findOne({_id:id})

        if(!information){
            res.send({
                suc: false,
                msg: "Error!"
            });
        }else{
            information.set({name,update: new Date()}).save().then(()=>{
                res.send({
                    suc: true,
                    msg: "Changed!"
                });
            })
        }
    },
    del: async(req, res)=>{
        const {id} = req.query;
        listModel.deleteOne({_id:id}).then(()=>{
            res.send({
                suc: true,
                msg: "Deleted!"
            });
        })
    },
    get: async(req, res)=>{
        const {id} =req.query;
        const data1 = await listModel.find({userId:id});
        if (!data1) {
            res.send({
                suc: false,
                msg: "List is empty!"
            });
        } else {
            res.send({
                suc: false,
                data:data1
            });
        }
    }   
}