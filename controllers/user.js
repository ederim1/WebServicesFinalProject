const mongoose = require('mongoose');
const userModel = require('../models/index');
const model = userModel.user;
const createError = require('http-errors');

const controller = {}

// POST USER
controller.addUser = async(req, res) => {
    try {
        console.log(req.result)
        const user = await model.create(req.result);
        console.log(user)
        res.status(201).json(user)
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

// DELETE USER
controller.deleteUser = async(req,res,next) => {
    try {
        const {id} = req.params;
        console.log(id)
        console.log(req.params)
        console.log(req.params.id)
        const user = await model.findByIdAndDelete(id);
        console.log(user)
        if(!user){
            throw createError(404, "User does not exist");
        }else{
            res.status(200).json(user);
        }
    } catch (err) {
        if(err instanceof mongoose.CastError){
            next(createError(400, "Invalid User Id"))
            return
        }
        next(err)
    }
};



module.exports = controller;