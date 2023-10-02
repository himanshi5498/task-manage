const taskDao = require('./taskDao');
const constants = require('../../properties/constants');

module.exports = {
    createTask,
    updateTask
}

async function createTask(taskInfo) {
    try {
        const taskId = await taskDao.createTask(taskInfo);
        await taskDao.createTaskLogs({ taskId, updated_by: taskInfo.updated_by, info: constants.TASK_LOG_MESSAGE.CREATED });
        return taskId;
    } catch (err) {
        throw err;
    }
}

async function updateTask(previousTask, newTask) {
    try {
        const taskUpdated = await taskDao.updateTask(newTask);
        if (taskUpdated.changedRows) {
            let infoUpdated = constants.TASK_LOG_MESSAGE.UPDATED;
            if (newTask.name != undefined && previousTask.name != newTask.name) {
                infoUpdated += 'Name updated from ' + previousTask.name + ' to ' + newTask.name + ',';
            }
            if (newTask.status != undefined  && previousTask.status != newTask.status) {
                infoUpdated += 'Status updated from ' + constants.REVERSE_TASK_STATUS[previousTask.status] + ' to ' + constants.REVERSE_TASK_STATUS[newTask.status] + ',';
            }
            if (newTask.description != undefined && previousTask.description != newTask.description) {
                infoUpdated += 'Description updated from ' + previousTask.description + ' to ' + newTask.description + ',';
            }
            await taskDao.createTaskLogs({ taskId: newTask.taskId, updated_by: newTask.updated_by, info: infoUpdated });
        }
        return taskUpdated;
    } catch (err) {
        throw err;
    }
}