const Joi = require('joi');

const responses = require('./../responses/responses');

/**
 * common function for validating schema
 * @param {Object} apiReference 
 * @param {Object}  {req, body, res, schema}
 */
const validateFields = ({ req, body, res, schema }) => {
    let validation = schema.validate(body);
    if (validation.error) {
        let errorReason = validation.error.details ? validation.error.details[0].message : 'Parameter missing or parameter type is wrong';
        responses.parameterMissingResponse(res, errorReason);
        return false;
    }
    return true;
};

module.exports = { validateFields };