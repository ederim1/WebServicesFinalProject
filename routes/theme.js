const routes = require('express').Router();
const controller = require('../controllers/theme');
const themeValidation = require('../utilities/validation_schema');



routes.post('/', themeValidation.checkThemeSchema, controller.addTheme);
routes.delete('/:id', controller.deleteTheme);


module.exports = routes;