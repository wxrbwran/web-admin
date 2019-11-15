const Koa = require('koa');
require('babel-core/register')({});
const app = new Koa();
const middleware = require('./middleware');

middleware(app);

// routes
const index = require('./routes/index');
const api = require('./routes/api');
const outerApi = require('./routes/outer_api');
const auth = require('./routes/auth');
const upload = require('./routes/upload');

app.use(index.routes(), index.allowedMethods());
app.use(api.routes(), api.allowedMethods());
// outerApi 无需jsonwebtoken, 供前台页面使用
app.use(outerApi.routes(), outerApi.allowedMethods());
app.use(auth.routes(), auth.allowedMethods());
app.use(upload.routes(), upload.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx);
});

module.exports = app;
