const { knex} = require('../config/db');

knex.schema.withSchema('web_fx').createTableIfNotExists('slow', function(table) {
    table.increments();
    table.string('type').notNull();
    table.string('cover').notNull();
    table.text('desc').notNull();
    table.text('text').notNull();
    table.timestamp('created_time').defaultTo(knex.fn.now());
}).asCallback(() => {
    console.log('table slow has created!');
});

const infoColumn = ['type', 'cover', 'cover_inner', 'desc', 'text'];

module.exports = {
    getAllSlowInfo: async (ctx) => {
        try {
            const info = await knex
                .column(infoColumn)
                .from('slow');
            return ctx.body = {
                status: 'success',
                data: {
                    info: info || {},
                },
            };
        } catch (e) {
            return ctx.body = {
                status: 'fail',
                data: e.stack,
            };
        }
    },
    getSlowInfoByType: async (ctx) => {
        const { type } = ctx.params;
        try {
            const info = await knex
                .first(infoColumn)
                .where({type})
                .from('slow');
            return ctx.body = {
                status: 'success',
                data: {
                    info: info || {},
                },
            };
        } catch (e) {
            return ctx.body = {
                status: 'fail',
                data: e.stack,
            };
        }
    },

    addInfo: async (ctx, next) => {
        try {
            await knex('slow').returning('id').insert(ctx.request.body);
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

    editInfoByType: async (ctx, next) => {
        const { type } = ctx.params;
        try {
            await knex('slow')
                .update(ctx.request.body)
                .where({type});
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
