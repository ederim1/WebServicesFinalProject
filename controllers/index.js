const mongoose = require('mongoose');
const reminderModel = require('../models/index');
const model = reminderModel.reminder; 
const createError = require('http-errors');

const controller = {}

// GET ALL reminderS
controller.getAllReminders = async(req, res) => {
    try {
        const query = { "user.email": { $elemMatch: { $eq: req.oidc.user.email } } };
        const reminders = await model.find(query).select("-user");

        res.status(200).json(reminders);
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

// GET ONE REMINDER
controller.getReminder = async(req, res, next) => {
    try {
        const {id} = req.params
        const reminder = await model.findById(id).select("-user");
        if(!reminder){
            throw createError(404, "Product does not exist");
        }else{
            res.status(200).json(reminder);
        }
    } catch (err) {
        // res.status(500).json({message: err.message})
        if(err instanceof mongoose.CastError){
            next(createError(400, "Invalid Reminder Id"))
            return
        }
        next(err)
    }
}

// POST REMINDER
controller.addReminder = async(req, res) => {
    try {
        const{ name, email } = req.oidc.user;
        req.result.user = {name, email}
        const reminder = await model.create(req.result);

        res.status(201).json(reminder);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

// PUT REMINDER
controller.editReminder = async(req,res,next) => {
    try {
        const {id} = req.params;
        const reminder = await model.findByIdAndUpdate(id,req.result);
        if(!reminder){
            throw createError(404, "Product does not exist");
        }else{
            res.status(204).json(reminder);
        }
    } catch (err) {
        // res.status(500).json({message: err.message})
        if(err instanceof mongoose.CastError){
            next(createError(400, "Invalid Reminder Id"))
            return
        }
        next(err)
    }
}

// DELETE REMINDER
controller.deleteReminder = async(req,res,next) => {
    try {
        const {id} = req.params;
        const reminder = await model.findByIdAndDelete(id);
        if(!reminder){
            throw createError(404, "Reminder does not exist");
        }else{
            res.status(200).json(reminder);
        }
    } catch (err) {
        // res.status(500).json({message: err.message})
        if(err instanceof mongoose.CastError){
            next(createError(400, "Invalid Reminder Id"))
            return
        }
        next(err)
    }
}

module.exports = controller;