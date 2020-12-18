const bcrypt = require('bcryptjs')
const pool = require('../../core/db')
const { NotFound, AuthFailed } = require('../../core/httpException')
const { prepareParm } = require('../../core/util')

/**
 * 验证用户是否存在
 * @param {*} id 学/工号
 */
const verifyUserId = async (name) => {
    const queryStr = `SELECT * FROM user WHERE name = '${name}'`;
    const user = await pool.query(queryStr);
    if(!user.length) {
        return false;
    }else {
        return user;
    }
}

/**
 * 验证账号密码
 * @param {*} param {id, passwd}
 */
const verifyAccount = async (param) => {
    const user = await verifyUserId(param.name);
    if(!user) {
        throw new NotFound('账号不存在')
    }
    const correct = bcrypt.compareSync(param.passwd, user[0].passwd)
    if (!correct) {
        throw new AuthFailed('密码不正确')
    }
    return user[0]
}

/**
 * 获取用户信息
 * @param {*} id
 */
const getUserInfo = async (id) => {
    const queryStr = 'SELECT name, default_city, default_city_code, default_day, auto_login FROM user WHERE id = ?'
    const info = await pool.query(queryStr, [id])
    if(!info.length) {
        throw new AuthFailed('该账号当前不可用')
    }
    return info[0]
}

/**
 * 新增用户
 * @param {*} user 
 */
const addUser = async (user) => {
    const salt = bcrypt.genSaltSync(10)
    user['passwd'] = bcrypt.hashSync(user.passwd, salt)
    const fieldList = [];
    const valList = [];
    prepareParm(user, fieldList, valList, []);
    const insertStr = `insert into user (${fieldList.join(',')}) values(${valList.join(',')})`;
    await pool.query(insertStr);

    console.log(`成功创建用户：${user.name}`)
}

module.exports = {
    addUser,
    verifyAccount,
    getUserInfo
}