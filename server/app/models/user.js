const bcrypt = require('bcryptjs')
const pool = require('../../core/db')
const { NotFound, AuthFailed, AccountExist } = require('../../core/httpException')
const { prepareParm } = require('../../core/util')
const { modify } = require('../lib/helper')

/**
 * 验证用户是否存在(通过name)
 * @param {*} name 昵称
 */
const verifyUserName = async (name) => {
    const queryStr = `SELECT * FROM user WHERE name = '${name}'`;
    const user = await pool.query(queryStr);
    if(!user.length) {
        return [];
    }else {
        return user;
    }
}

/**
 * 验证用户是否存在（通过id）
 * @param {*} uid id
 */
const verifyUserId = async (uid) => {
    const queryStr = `SELECT * FROM user WHERE id = '${uid}'`;
    const user = await pool.query(queryStr);
    if (!user.length) {
        return [];
    } else {
        return user;
    }
}

/**
 * 验证账号密码
 * @param {*} param {name, passwd} / {id, passwd}
 * @param {*} type name / id
 */
const verifyAccount = async (param, type) => {
    const user = type === 'name' ? 
                 await verifyUserName(param.name) : 
                 type === 'id' ?
                 await verifyUserId(param.id):
                 []
    if (!user.length) {
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
    const r = await verifyUserName(user.name)
    if (r) {
        throw new AccountExist('昵称已占用')
    }
    const salt = bcrypt.genSaltSync(10)
    user['passwd'] = bcrypt.hashSync(user.passwd, salt)
    const fieldList = [];
    const valList = [];
    prepareParm(user, fieldList, valList, []);
    const insertStr = `insert into user (${fieldList.join(',')}) values(${valList.join(',')})`;
    await pool.query(insertStr);

    console.log(`成功创建用户：${user.name}`)
}

/**
 * 修改密码
 * @param {*} uid 
 * @param {*} oldPwd 
 * @param {*} newPwd 
 */
const modifyPasswd = async (uid, oldPwd, newPwd) => {
    const user = await verifyAccount({id: uid, passwd: oldPwd}, 'id')
    const salt = bcrypt.genSaltSync(10)
    await modify('user', { passwd: bcrypt.hashSync(newPwd, salt)}, {id: uid})

    console.log(`成功修改用户密码：${user.name}`)
}

/**
 * 修改默认城市
 * @param {*} uid 
 * @param {*} name 城市名称
 * @param {*} code 城市编码
 */
const modifyDefaultCity = async (uid, name, code) => {
    await modify('user', { default_city: name, default_city_code: code }, { id: uid })

    console.log(`成功修改用户默认城市：${uid} ${name}`)
}

/**
 * 修改默认查看天数
 * @param {*} uid 
 * @param {*} day 天数
 */
const modifyDefaultDay = async (uid, day) => {
    await modify('user', { default_day: day }, { id: uid })

    console.log(`成功修改用户默认历史查看天数：${uid} ${day}`)
}

/**
 * 修改自动登录设置
 * @param {*} uid 
 * @param {*} autoLogin 
 */
const modifyAutoLogin = async (uid, autoLogin) => {
    await modify('user', { auto_login: autoLogin }, { id: uid })

    console.log(`成功修改用户自动登录设置：${uid} ${autoLogin}`)
}

/**
 * 设置的修改操作
 * pwd: {oldPwd, newPwd}
 * city: {name, code}
 * day: {day}
 * login: {autoLogin}
 * @param {*} uid 
 * @param {*} type pwd / city / day / login
 * @param {*} params 
 */
const modifySetting = async (uid, type, params) => {
    // 1. 验证用户存在
    const user = await verifyUserId(uid)
    if (!user.length) {
        throw new NotFound('账号不存在')
    }
    // 2. 按类型进行对应的修改操作
    switch (type) {
        case 'pwd':
            await modifyPasswd(uid, params.oldPwd, params.newPwd)
            break;
        case 'city':
            await modifyDefaultCity(uid, params.name, params.code)
            break;
        case 'day':
            await modifyDefaultDay(uid, params.day)
            break;
        case 'login':
            await modifyAutoLogin(uid, params.autoLogin)
            break;
        default:
            break;
    }
}

module.exports = {
    addUser,
    verifyAccount,
    getUserInfo,
    modifySetting
}