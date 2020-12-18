const Router = require('koa-router')
const { RegisterValidator } = require('../../validators/validator')
const { success } = require('../../lib/helper')
const { addUser, getUserInfo } = require('../../models/user')
const { Auth } = require('../../../middlewares/auth')

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

module.exports = router