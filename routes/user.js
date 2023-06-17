const routes = require('express').Router();
const controller = require('../controllers/user');
const userValidation = require('../utilities/validation_schema');



routes.post('/', userValidation.checkUserSchema, controller.addUser);
routes.delete('/:id', controller.deleteUser);


module.exports = routes;