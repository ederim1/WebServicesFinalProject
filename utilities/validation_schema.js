const Joi = require('@hapi/joi')

const reminderSchema = Joi.object({
    reminder: Joi.string().required().min(1),
    check: Joi.boolean().required(),
    title: Joi.string(),
    deadline: Joi.string(),
    place: Joi.string(),
    priority: Joi.boolean(),
    reminder: Joi.boolean()
})

const checkReminderSchema = async(req,res,next) => {
    try {
        const reminder = req.body;
        const result = await reminderSchema.validateAsync(reminder);
        req.result = result
        next();
    } catch (err) {
        if(err.isJoi === true) {
        return res.status(422).json({message: err.message});
        }
    }
}

const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required()
});

const checkUserSchema = async(req,res,next) => {
    try {
        const user = req.body;
        const result = await userSchema.validateAsync(user);
        req.result = result;
        next();
    } catch (err) {
        if(err.isJoi === true) {
            return res.status(422).json({message: err.message});
        }
    }
}

module.exports = {checkReminderSchema, checkUserSchema};