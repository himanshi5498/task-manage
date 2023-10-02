const taskService = require('./taskService');
const responses = require('../../responses/responses');
const _ = require('underscore');
const taskDao = require('./taskDao');
const constants = require('../../properties/constants');

async function createTask(req, res) {
    try {
        let taskInfo = {
            name: req.body.name,
            description: req.body.description,
            updated_by: req.body.updated_by,
            status: req.body.status
        };
        const task_id = await taskService.createTask(taskInfo);
        responses.sendSuccess(res, { task_id });
    } catch (err) {
        responses.sendError(res, {}, err.toString());
    }
}

async function updateTask(req, res) {
    try {
        let taskInfo = {
            taskId: req.body.task_id,
            name: req.body.name,
            description: req.body.description,
            updated_by: req.body.updated_by,
            status: req.body.status
        };
        const previousInfo = await taskDao.getTask({ taskId: taskInfo.taskId });
        if (_.isEmpty(previousInfo)) {
            return responses.sendError(res, {}, "Task is invalid");
        }
        await taskService.updateTask(previousInfo[0], taskInfo);
        responses.sendSuccess(res, { taskId: taskInfo.taskId });
    } catch (err) {
        responses.sendError(res, {}, err.toString());
    }
}

async function getMetrics(req, res) {
    try {
        const allTasks = await taskDao.getTaskCountMetrics();
        let taskArray = [];
        for (const task of allTasks) {
            let taskInfo = taskArray.find(x => x.date == task.task_date.toISOString().slice(0,10));
            if (!taskInfo) {
                let metricsObj = {
                    date: task.task_date.toISOString().slice(0,10),
                    metrics: {},
                };
                metricsObj.metrics[constants.TASK_STATUS.OPEN.text] = 0;
                metricsObj.metrics[constants.TASK_STATUS.ONGOING.text] = 0;
                metricsObj.metrics[constants.TASK_STATUS.COMPLETED.text] = 0;
                taskArray.push(metricsObj);
                taskInfo = metricsObj;
            }
            taskInfo.metrics[constants.REVERSE_TASK_STATUS[task.status] + "_tasks"] += task.total_tasks;
        }
        responses.sendSuccess(res, taskArray);

    } catch (err) {
        responses.sendError(res, {}, err.toString());
    }
}

async function getTaskCount(req, res) {
    try {
        let start_date = req.query.start_date;
        let end_date = req.query.end_date;
        const allTasks = await taskDao.getCount({ startDate: start_date, endDate: end_date });
        let taskObj = {
            [`${constants.TASK_STATUS.OPEN.text}`]: 0,
            [`${constants.TASK_STATUS.ONGOING.text}`]: 0,
            [`${constants.TASK_STATUS.COMPLETED.text}`]: 0,
        };
        for (const task of allTasks) {
            taskObj[constants.REVERSE_TASK_STATUS[task.status] + "_tasks"] += task.total_tasks;
        }
        responses.sendSuccess(res, taskObj);

    } catch (err) {
        responses.sendError(res, {}, err.toString());
    }
}

module.exports = {
    createTask,
    updateTask,
    getMetrics,
    getTaskCount
}