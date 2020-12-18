const Router = require('koa-router')
const { AddRecordValidator } = require('../../validators/validator')
const { success } = require('../../lib/helper')
const { getCityList, addCity } = require('../../models/history')
const { Auth } = require('../../../middlewares/auth')

const router = new Router({
    prefix: '/v1/history'
})

/**
 * 历史天气城市列表
 */
router.get('/list', new Auth().m, async (ctx) => {
    const list = await getCityList(ctx.auth.uid)
    ctx.body = {
        list
    }
})

/**
 * 添加历史查询城市记录
 * @param {*} name city_name 城市名称
 * @param {*} code city_code 城市编码
 */
router.get('/add', new Auth().m, async (ctx) => {
    const v = await new AddRecordValidator().validate(ctx)
    await addCity({ uid: ctx.auth.uid, city_name: v.get('query.name'), city_code: v.get('query.code') })
    success();
})

module.exports = router