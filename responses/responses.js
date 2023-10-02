const constants = require("../properties/constants");

const parameterMissingResponse = (res, err = constants.RESPONSE_MESSAGES.PARAMETER_MISSING, data = {}) => {
    let response = {
        message: err || constants.RESPONSE_MESSAGES.PARAMETER_MISSING,
        status: 400,
        data: data || {}
    };
    res.json(response);
};

function sendSuccess(res, data = {}, msg = constants.RESPONSE_MESSAGES.SUCCESS) {
    let response = {
        status: 200,
        message: msg,
        data: data
    }
    res.json(response);
}

function sendError(res, data = {}, msg = constants.RESPONSE_MESSAGES.ERROR) {
    let response = {
        status: 400,
        message: msg,
        data: data
    }
    res.json(response);
}

module.exports = { parameterMissingResponse, sendSuccess, sendError }