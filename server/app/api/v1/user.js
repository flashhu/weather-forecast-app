const Router = require('koa-router')
const { 
    RegisterValidator, 
    updatePasswdValidator, 
    updateCityValidator,
    updateHistoryDayValidator,
    updateAutoLoginValidator
} = require('../../validators/validator')
const { success } = require('../../lib/helper')
const { addUser, getUserInfo, modifySetting } = require('../../models/user')
const { Auth } = require('../../../middlewares/auth')
const { ParameterException } = require('../../../core/httpException')

const router = new Router({
    prefix: '/v1/user'
})

/**
 * 用户注册
 * @param {string} name 昵称
 * @param {string} passwd 密码
 */
router.post('/register', async (ctx)=> {
    const v = await new RegisterValidator().validate(ctx)
    const user = {
        name: v.get('body.name'),
        passwd: v.get('body.passwd')
    }
    await addUser(user);
    success();
})

/**
 * 获取用户信息
 */
router.get('/info', new Auth().m, async (ctx) => {
    const info = await getUserInfo(ctx.auth.uid)
    ctx.body = {
        info
    }
})

/**
 * 用户设置——修改部分值
 * 1. pwd
 * 传值：oldPasswd 原密码；newPasswd 新密码
 * 2. city
 * 传值：cityName 城市名称；cityCode 城市代码
 * 3. day
 * 传值：day
 * 4. login
 * 传值：autoLogin
 * @param {string} type pwd / city / day / login
 */
router.post('/setting', new Auth().m, async (ctx) => {
    let v;
    switch (ctx.request.body.type) {
        case 'pwd':
            v = await new updatePasswdValidator().validate(ctx)
            await modifySetting(ctx.auth.uid, 'pwd', { oldPwd: v.get('body.oldPasswd'), newPwd: v.get('body.newPasswd') })
            break;
        case 'city':
            v = await new updateCityValidator().validate(ctx)
            await modifySetting(ctx.auth.uid, 'city', { name: v.get('body.cityName'), code: v.get('body.cityCode')})
            break;
        case 'day':
            v = await new updateHistoryDayValidator().validate(ctx)
            await modifySetting(ctx.auth.uid, 'day', { day: v.get('body.day')})
            break;
        case 'login':
            v = await new updateAutoLoginValidator().validate(ctx)
            await modifySetting(ctx.auth.uid, 'login', { autoLogin: v.get('body.autoLogin')})
            break;
        default:
            throw new ParameterException('设置类型有误')
    }
    success();
})

module.exports = router