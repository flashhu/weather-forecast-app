const Router = require('koa-router')
const { TokenValidator } = require('../../validators/validator')
const { verifyAccount, getUserInfo } = require('../../models/user')
const { generateToken } = require('../../../core/util')
const { Auth } = require('../../../middlewares/auth')

const router = new Router({
    prefix: '/v1/token'
})

/**
 * 用户登录(返回token)
 * @param {string} name 用户昵称
 * @param {string} passwd 密码
 */
router.post('/', async (ctx) => {
    const v = await new TokenValidator().validate(ctx)
    console.log(v.get('body.name'), v.get('body.passwd'));
    const user = await verifyAccount({name: v.get('body.name'), passwd: v.get('body.passwd')})
    const token = user.auto_login ? generateToken(user.id, Auth.USER): ''
    const info = await getUserInfo(user.id)
    ctx.body = {
        token,
        info
    }
})

module.exports = router