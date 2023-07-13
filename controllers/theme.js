const mongoose = require('mongoose');
const themeModel = require('../models/index');
const model = themeModel.theme;
const createError = require('http-errors');

const controller = {}

// POST theme
controller.addTheme = async(req, res) => {
    try {
        console.log(req.result)
        const theme = await model.create(req.result);
        console.log(theme)
        res.status(201).json(theme)
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

// DELETE THEME
controller.deleteTheme = async(req,res,next) => {
    try {
        const {id} = req.params;
        console.log(id)
        console.log(req.params)
        console.log(req.params.id)
        const theme = await model.findByIdAndDelete(id);
        console.log(theme)
        if(!theme){
            throw createError(404, "theme does not exist");
        }else{
            res.status(200).json(theme);
        }
    } catch (err) {
        if(err instanceof mongoose.CastError){
            next(createError(400, "Invalid theme Id"))
            return
        }
        next(err)
    }
};



module.exports = controller;