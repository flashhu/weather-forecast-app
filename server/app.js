const Koa = require('koa')
const cors = require('@koa/cors');
const parser = require('koa-bodyparser')
const InitManager = require('./core/init')
const catchError = require('./middlewares/exception')

const app = new Koa()
const port = 8070

app.use(cors())
app.use(parser())
app.use(catchError)
InitManager.initCore(app)

app.listen(port, () => { console.log(`Running on localhost:${port}`)})