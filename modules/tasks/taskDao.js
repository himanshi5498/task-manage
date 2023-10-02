const mysqlLib = require("./../../database/mysql");
module.exports = {
	createTask,
	createTaskLogs,
	updateTask,
	getTask,
	getTaskCountMetrics,
	getCount
}

async function createTask(taskInfo) {
	try {
		let sql = `INSERT INTO tb_tasks set ? `;
		let params = [];
		let insertObj = {
			updated_by: taskInfo.updated_by,
		};
		if (taskInfo.status) {
			insertObj.status = taskInfo.status;
			insertObj.updated_status_time = new Date();
		}
		if (taskInfo.name) {
			insertObj.name = taskInfo.name;
		}
		if (taskInfo.description) {
			insertObj.description = taskInfo.description;
		}
		let result = await mysqlLib.mysqlQueryPromise(sql, insertObj);
		return result.insertId;
	} catch (error) {
		throw error;
	}
}

async function updateTask(taskInfo) {
	try {
		let sql = `Update tb_tasks set ? where task_id = ? `;
		let updateObj = {
			updated_by: taskInfo.updated_by,
		};

		if (taskInfo.status) {
			updateObj.status = taskInfo.status;
			updateObj.updated_status_time = new Date();
		}
		if (taskInfo.name) {
			updateObj.name = taskInfo.name;
		}
		if (taskInfo.description) {
			updateObj.description = taskInfo.description;
		}

		let params = [updateObj, taskInfo.taskId];
		let result = await mysqlLib.mysqlQueryPromise(sql, params);
		return result;
	} catch (error) {
		throw error;
	}
}
async function createTaskLogs(taskInfo) {
	try {
		let sql = `INSERT INTO tb_task_logs (task_id, updated_by, info) VALUES (?, ?, ?)`;
		let params = [taskInfo.taskId, taskInfo.updated_by, taskInfo.info];
		let result = await mysqlLib.mysqlQueryPromise(sql, params);
		return result.insertId;
	} catch (error) {
		throw error;
	}
}

async function getTask(taskInfo) {
	try {
		let sql = `select * from tb_tasks where 1=1 `;
		let params = [];

		if (taskInfo.taskId) {
			sql += ' and task_id = ?';
			params.push(taskInfo.taskId);
		}

		let result = await mysqlLib.mysqlQueryPromise(sql, params);
		return result;
	} catch (error) {
		throw error;
	}
}

async function getTaskCountMetrics() {
	try {
		let sql = `select count(*) as total_tasks, status, date(updated_status_time) as task_date from tb_tasks group by status, 
			date(updated_status_time)`;
		let params = [];
		let result = await mysqlLib.mysqlQueryPromise(sql, params);
		return result;
	} catch (error) {
		throw error;
	}
}

async function getCount(params) {
	try {
		let sql = `select count(*) as total_tasks, status from tb_tasks where 1=1 `;
		let sqlParams = [];
		if (params.startDate) {
			sql += ' and updated_status_time >= ?';
			sqlParams.push(params.startDate);
		}
		if (params.endDate) {
			sql += ' and updated_status_time <= ?';
			sqlParams.push(params.endDate);
		}
		sql += 'group by status'
		let result = await mysqlLib.mysqlQueryPromise(sql, sqlParams);
		return result;
	} catch (error) {
		throw error;
	}
}
