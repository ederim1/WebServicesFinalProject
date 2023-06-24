const routes = require('express').Router();
const controller = require('../controllers/team');
const teamValidation = require('../utilities/validation_schema');
const { requiresAuth } = require('express-openid-connect');


// get all team reminders
routes.get('/',requiresAuth(), (req, res) => {
    if (req.oidc.isAuthenticated()){
        controller.getRemindersByTeam(req, res) 
    } else {
        res.redirect('/login');
    }
    });

// post new team
routes.post('/', requiresAuth(), teamValidation.checkReminderSchema, (req, res) => {
    if(req.oidc.isAuthenticated()) {
        controller.addTeam(req, res);
    } else {
        res.redirect('/login');
    }
});

// delete team
routes.delete('/:id', requiresAuth(), (req, res, next) => {
    if(req.oidc.isAuthenticated()) {
        controller.deleteTeam(req, res, next);
    } else{
        res.redirect('/login');
    }
});


module.exports = routes;