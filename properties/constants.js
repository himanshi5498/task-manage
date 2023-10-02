exports.RESPONSE_MESSAGES = {
    ERROR: "Something went wrong",
    SUCCESS: "Success",
    AUTH_FAILED: "Authentication failed",
    PARAMETER_MISSING: "Parameter missing",
}

exports.RESPONSE_STATUS = {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    SUCCESS: 200,
    INTERNAL_SERVER_ERROR: 500
}

exports.TASK_LOG_MESSAGE = {
    CREATED: "Task created",
    UPDATED: "Task info updated - ",
}

exports.TASK_STATUS = {
    OPEN: {
        text: "open_tasks",
        status: 1,
    },
    ONGOING: {
        text: "inprogress_tasks",
        status: 2,
    },
    COMPLETED: {
        text: "completed_tasks",
        status: 3,
    },
}

exports.REVERSE_TASK_STATUS = {
    1: "open",
    2: "inprogress",
    3: "completed"
}