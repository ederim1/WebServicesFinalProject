const routes = require('express').Router();
const controller = require('../controllers');
const reminderValidation = require('../utilities/validation_schema');

const { requiresAuth } = require('express-openid-connect');


// gets all reminders of the user
routes.get('/',requiresAuth(), (req, res) => {
    if (req.oidc.isAuthenticated()){
        controller.getAllReminders(req, res) 
    } else {
        res.redirect('/login');
    }
    });

// get reminder by id
routes.get('/:id', requiresAuth(), (req, res, next) => {
    if (req.oidc.isAuthenticated()){
        controller.getReminder(req, res, next);
        console.log(JSON.stringify(req.oidc.user)); 
    } else {
        res.redirect('/login');
    }
});

// post new reminder
routes.post('/', requiresAuth(), reminderValidation.checkReminderSchema, (req, res) => {
    if(req.oidc.isAuthenticated()) {
        controller.addReminder(req, res);
    } else {
        res.redirect('/login');
    }
});
// edit reminder
routes.put('/:id',requiresAuth(), reminderValidation.checkReminderSchema, (req, res, next) => {
    if(req.oidc.isAuthenticated()) {
        controller.editReminder(req, res, next);
    } else {
        res.redirect('/login');
    }
});
// delete reminder
routes.delete('/:id', requiresAuth(), (req, res, next) => {
    if(req.oidc.isAuthenticated()) {
        controller.deleteReminder(req, res, next);
    } else{
        res.redirect('/login');
    }
});

module.exports = routes;