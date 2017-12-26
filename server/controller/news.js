const { News, knex, Positions } = require('../config/db');
const moment = require('moment');

const articleColumn = ['id', 'title', 'is_open', 'is_top', 'is_draft',
    'publish_time_type', 'publish_time'];

const FEArticleColumn = ['id', 'title', 'description', 'content', 'is_top', 'publish_time'];

module.exports = {

    getAllArticles: async (ctx) => {
        try {
            const offset = ctx.request.query.page_size * (ctx.request.query.page_at - 1);
            const total = await knex
                .column(articleColumn.concat('created_time'))
                .where({'is_delete': false})
                .from('news');
            const news = await knex
                .column(articleColumn.concat('created_time'))
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
                        newsItem.created_time = moment(newsItem.created_time)
                            .format('YYYY/MM/DD HH:mm');
                        newsItem.publish_time = moment(newsItem.publish_time)
                            .format('YYYY/MM/DD HH:mm');
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

    getPostArticles: async (ctx) => {
        try {
            const offset = ctx.request.query.page_size * (ctx.request.query.page_at - 1);
            const total = await knex
                .column(FEArticleColumn)
                .where(
                    'publish_time', '<',new Date
                )
                .andWhere(
                    {
                        is_delete: false,
                        is_open: true,
                        is_draft: false,
                    })
                .from('news');
            const news = await knex
                .column(FEArticleColumn)
                .where('publish_time', '<',new Date)
                .andWhere(
                    {
                        is_delete: false,
                        is_open: true,
                        is_draft: false,
                    })
                .limit(ctx.request.query.page_size)
                .offset(offset)
                .orderBy('publish_time', 'desc')
                .from('news');
            return ctx.body = {
                status: 'success',
                data: {
                    news: news.map(newsItem => {
                        newsItem.created_time = moment(newsItem.created_time)
                            .format('YYYY/MM/DD HH:mm');
                        newsItem.publish_time = moment(newsItem.publish_time)
                            .format('YYYY/MM/DD HH:mm');
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

    getArticleById: async (ctx) => {
        const { id } = ctx.params;
        try {
            const news = await knex
                .first(articleColumn.concat(['content', 'description']))
                .where({id, is_delete: false})
                .from('news');
            return ctx.body = {
                status: 'success',
                data: {
                    news: news,
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

    editArticleById: async (ctx, next) => {
        const { id } = ctx.params;
        try {
            await knex('news')
                .update(ctx.request.body)
                .where({id});
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

    deleteArticleById: async (ctx, next) => {
        const { id } = ctx.params;
        try {
            await knex('news')
                .update({is_delete: true})
                .where({id});
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