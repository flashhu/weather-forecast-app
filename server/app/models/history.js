const pool = require('../../core/db')
const { IgnoreOperation } = require('../../core/httpException')
const { prepareParm } = require('../../core/util')

/**
 * 验证记录是否存在
 * @param {*} uid 用户id
 * @param {*} code 城市code
 */
const verifyHistoryRecord = async (uid, code) => {
    const queryStr = `SELECT * FROM history WHERE uid = ${uid} AND city_code = '${code}'`;
    const record = await pool.query(queryStr);
    if (!record.length) {
        return false;
    } else {
        return true;
    }
}

/**
 * 根据用户id获取历史查询城市列表
 * @param {*} id 对应用户id
 */
const getCityList = async (id) => {
    const queryStr = `SELECT * FROM history WHERE uid = '${id}'`;
    const list = await pool.query(queryStr);
    return list
}

/**
 * 新增历史查询城市记录
 * @param {*} params uid, city_name, city_code
 */
const addCity = async (params) => {
    const isExist = await verifyHistoryRecord(params.uid, params.city_code);
    if(isExist) {
        throw new IgnoreOperation('当前城市已记录');
    } else{
        const fieldList = [];
        const valList = [];
        prepareParm(params, fieldList, valList, []);
        const insertStr = `insert into history (${fieldList.join(',')}) values(${valList.join(',')})`;
        await pool.query(insertStr);
        console.log(`成功添加历史记录：${params.uid} ${params.city_name}`)
    }
}


module.exports = {
    getCityList,
    addCity
}