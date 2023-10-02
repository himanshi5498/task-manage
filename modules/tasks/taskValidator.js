const Joi = require('joi');

const validator = require('./../../validators/validator');
const constants = require('./../../properties/constants');

const createTask = (req, res, next) => {
    let taskStatus = constants.TASK_STATUS;
    let schema = Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string().optional(),
        updated_by: Joi.number().required(),
        status: Joi.number().valid(taskStatus.OPEN.status, taskStatus.ONGOING.status, taskStatus.COMPLETED.status).required(),
    });
    validator.validateFields({ req, body: req.body, res, schema }) ? next() : 0;
};

const updateTask = (req, res, next) => {
    let taskStatus = constants.TASK_STATUS;
    let schema = Joi.object().keys({
        task_id: Joi.number().required(),
        name: Joi.string().optional(),
        description: Joi.string().optional(),
        updated_by: Joi.number().required(),
        status: Joi.number().valid(taskStatus.OPEN.status, taskStatus.ONGOING.status, taskStatus.COMPLETED.status).optional(),
    });
    validator.validateFields({ req, body: req.body, res, schema }) ? next() : 0;
};

module.exports = {
    createTask,
    updateTask
}
