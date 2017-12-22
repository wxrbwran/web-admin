const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const cors = require('koa2-cors');

module.exports = (app) => {
    // error handler
    onerror(app);
    // middlewares
    app.use(bodyparser({
        enableTypes: ['json', 'form', 'text'],
    }));
    app.use(cors({
        origin: function (ctx) {
            if (ctx.url === '/test') {
                return "*"; // 允许来自所有域名请求
            }
            return '*';
        },
        credentials: true,
        allowMethods: ['GET', 'POST', 'DELETE', 'PATCH'],
        allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
    }));
    app.use(json());
    app.use(logger());
    app.use(require('koa-static')(__dirname + '/public'));
    app.use(views(__dirname + '/views', {
        extension: 'ejs',
    }));

    // logger
    app.use(async (ctx, next) => {
        const start = new Date();
        await next();
        const ms = new Date() - start;
        console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
    });
};
