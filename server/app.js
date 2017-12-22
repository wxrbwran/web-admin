const Koa = require('koa');
require('babel-core/register')({});
const app = new Koa();
const middleware = require('./middleware')

const index = require('./routes/index');
const api = require('./routes/api');

middleware(app);
// routes
app.use(index.routes(), index.allowedMethods());
app.use(api.routes(), api.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx);
});

module.exports = app;
