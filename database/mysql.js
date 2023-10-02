const mysql = require('mysql2');
let connection = undefined;

const helperUtility = require('./../utilities/helperUtility');

exports.initialise = initialise;
exports.mysqlQueryPromise = mysqlQueryPromise;

function initialise(config) {
    let numConnectionsInPool = 0;
    connection = mysql.createPool(config);
    connection.on('connection', function (conn) {
        numConnectionsInPool++;
        console.log('CONNECTION IN POOL : ', numConnectionsInPool);
    });
    connection.on('error', function (error) {
        return initialise(config);
    });
    return connection;
}

function mysqlQueryPromise(queryString, params, transactionConnection) {
    return new Promise((resolve, reject) => {
        let newConnection = connection;
        if (transactionConnection) {
            newConnection = transactionConnection;
        }
        let query = newConnection.query(queryString, params, function (sqlError, sqlResult) {
            console.log({
                QUERY: helperUtility.removeNewLineCharacters(query.sql),
                SQL_ERROR: sqlError,
                SQL_RESULT: sqlResult,
                SQL_RESULT_LENGTH: sqlResult && sqlResult.length,
                params: params
            });
            if (sqlError || !sqlResult) {
                console.error({ ERR: sqlError, RESULT: sqlResult, SQL: query.sql });
                if (sqlError && sqlError.code === 'ER_LOCK_DEADLOCK' || sqlError.code === 'ER_QUERY_INTERRUPTED') {
                    setTimeout(mysqlQueryPromise.bind(null, queryString, params, newConnection), 50);
                } else {
                    return reject({ ERROR: sqlError, QUERY: query.sql, params: params, SQL: helperUtility.removeNewLineCharacters(this.sql) });
                }
            } else {
                return resolve(sqlResult);
            }
        });
    });
}