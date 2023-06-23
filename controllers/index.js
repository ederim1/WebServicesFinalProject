const mongoose = require('mongoose');
const reminderModel = require('../models/index');
const model = reminderModel.reminder; 
const createError = require('http-errors');

const controller = {}

// GET ALL reminderS
controller.getAllReminders = async(req, res) => {
    try {
        const reminders = await model.find({"user.email[0]": req.oidc.user.email});
        console.log(`after I send the get to mongo this is what I get back ${reminders}`)
        console.log(`stringify version ${JSON.stringify(reminders)}`)

        res.status(200).json(JSON.stringify(reminders));
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

// GET ONE REMINDER
controller.getReminder = async(req, res, next) => {
    try {
        const {id} = req.params
        const reminder = await model.findById(id);
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
        const{ name } = req.oidc.user;
        const{ email } = req.oidc.user;
        console.log(`this is the name from OAuth ${name}`)
        console.log(`this is the email from OAuth ${email}`)
        req.result.user = {name, email}
        console.log(`this is what I'm trying to send to mongo${JSON.stringify(req.result)}`)
        const reminder = await model.create(req.result);
        console.log(`after I send the info to mongo this is what I get back ${reminder}`)

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