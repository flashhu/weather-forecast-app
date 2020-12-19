const { Success } = require('../../core/httpException')
const { prepareParm } = require('../../core/util')
const pool = require('../../core/db')

function success(msg, errerrorCode) {
    throw new Success(msg, errerrorCode)
}

/**
 * update语句
 * @param {*} table 表名
 * @param {*} params 修改参数 {key: value}
 * @param {*} where 条件 {key: value}
 */
const modify = async (table, params, where) => {
    let setSql = [];
    let whereSql = [];
    prepareParm(params, [], [], setSql);
    prepareParm(where, [], [], whereSql);
    sql = `update ${table} set ${setSql.join(',')} where ${whereSql.join(' and ')}`;
    await pool.query(sql);
}

module.exports = {
    success,
    modify
}