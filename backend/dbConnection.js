const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

const dbConfig = {
    user: 'foodos',
    password: '123',
    connectString: 'localhost:1521/XEPDB1'
};

const getQuery = (query, binds = []) => {
    return new Promise(async (resolve, reject) => {
        try {
            const connection = await oracledb.getConnection(dbConfig);
            const result = await connection.execute(query, binds);
            resolve(result.rows);
        } catch (err) {
            reject(err);
        }
    });
};

const postQuery = (query, binds = []) => {
    return new Promise(async (resolve, reject) => {
        try {
            const connection = await oracledb.getConnection(dbConfig);
            const result = await connection.execute(query, binds, { autoCommit: true });
            resolve(result);
        } catch (err) {
            reject(err);
        }
    });
};

module.exports = {
    postQuery,
    getQuery
}