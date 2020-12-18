const jwt = require('jsonwebtoken')

const findMembers = function (instance, {
    prefix,
    specifiedType,
    filter
}) {
    // 递归函数
    function _find(instance) {
        //基线条件（跳出递归）
        if (instance.__proto__ === null)
            return []

        let names = Reflect.ownKeys(instance)
        names = names.filter((name) => {
            // 过滤掉不满足条件的属性或方法名
            return _shouldKeep(name)
        })

        return [...names, ..._find(instance.__proto__)]
    }

    function _shouldKeep(value) {
        if (filter) {
            if (filter(value)) {
                return true
            }
        }
        if (prefix)
            if (value.startsWith(prefix))
                return true
        if (specifiedType)
            if (instance[value] instanceof specifiedType)
                return true
    }

    return _find(instance)
}

const generateToken = function(uid, scope){
    const secretKey = global.config.security.secretKey
    const expiresIn = global.config.security.expiresIn
    // 生成令牌
    // 1. 可写入内容 2. 有时效性
    const token = jwt.sign({
        uid,
        scope  // 用户权限等级
    }, secretKey, {
        expiresIn
    })
    return token
}

/**
 * json转为键值对数组
 * @param {object} obj json对象
 * @param {Array} keys 键值
 * @param {Array} values 值
 * @param {Array} param 键值对 等号连接
 */
const prepareParm = (obj, keys, values, param) => {
    for (let key in obj) {
        let val = obj[key];
        // console.log('typeof(val)', typeof (val));
        keys.push(key)
        if (typeof (val) === 'string') {
            values.push(`'${val}'`);
            param.push(`${key}='${val}'`);
        } else if (val instanceof Array) {
            values.push(`'${val.join('|')}'`);
            param.push(`${key}='${val}'`);
        } else {
            values.push(`${val}`);
            param.push(`${key}=${val}`);
        }
    }
}

module.exports = {
    findMembers,
    generateToken,
    prepareParm
}