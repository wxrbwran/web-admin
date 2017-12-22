const { News, knex, Positions } = require('../config/db');

module.exports = {
    index: (ctx, next) => {
        ctx.body = {
            title: 'koa2 json'
        };
    },
    test: (ctx, next) => {
        ctx.body = {
            ctx,
            params: ctx.params,
            query: ctx.query
        };
    },
    addArticle: async (ctx, next) => {
        try {
            await knex('news').returning('id').insert(ctx.request.body);
            return ctx.body = {
                status: 'success',
                data: null,
            };
        } catch (e) {
            return ctx.body = {
                status: 'fail',
                data: e.stack,
            };
        }
    },
};
