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
    getArticle: async (ctx) => {
        try {
            const columns = ['id', 'title', 'is_open', 'is_top',
                'publish_time_type', 'publish_time', 'created_time'];
            const offset = ctx.request.query.page_size * (ctx.request.query.page_at - 1);
            const total = await knex
                .column(columns)
                .where({'is_delete': false})
                .from('news');
            const news = await knex
                .column(columns)
                .where({'is_delete': false})
                .limit(ctx.request.query.page_size)
                .offset(offset)
                .orderBy('created_time', 'desc')
                .from('news');
            return ctx.body = {
                status: 'success',
                data: {
                    news: news.map((newsItem, idx) => {
                        newsItem.index = offset + idx + 1;
                        return newsItem;
                    }),
                    total: total.length,
                },
            };
        } catch (e) {
            return ctx.body = {
                status: 'fail',
                data: e.stack,
            };
        }
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
