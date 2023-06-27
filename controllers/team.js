const mongoose = require('mongoose');
const model = require('../models/index');
const teamModel = model.team; 
const reminderModel = model.reminder; 
const createError = require('http-errors');
const { json } = require('body-parser');

const controller = {}

// GET reminders by team
// it'll only show the reminders that have user's email and the correct team name, 
controller.getRemindersByTeam = async(req, res) => {
    try {
        const query = { "team": req.body.name, "user.email": { $elemMatch: { $eq: req.oidc.user.email } } };

        const reminders = await reminderModel.find(query).select("-user");

        res.status(200).json(reminders);
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

// POST team
controller.addTeam = async(req, res) => {
    try {
        console.log(`this is what I send to mongo ${JSON.stringify(req.result)}`)
        const team = await teamModel.create(req.result);
        console.log(`and this is what mongo sent back ${team}`)

        res.status(201).json(team);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

// DELETE Team
controller.deleteTeam = async(req,res,next) => {
    try {
        const {id} = req.params;
        const team = await model.findByIdAndDelete(id);
        if(!team){
            throw createError(404, "Team does not exist");
        }else{
            res.status(200).json(team);
        }
    } catch (err) {
        
        if(err instanceof mongoose.CastError){
            next(createError(400, "Invalid Team Id"))
            return
        }
        next(err)
    }
}













module.exports = controller;