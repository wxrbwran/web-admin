const { knex} = require('../config/db');
const moment = require('moment');

knex.schema.withSchema('web_fx').createTableIfNotExists('info', function(table) {
    table.increments();
    table.string('name').notNull();
    table.string('short_name');
    table.string('copyright').notNull();
    table.string('logo').notNull();
    table.specificType('img', 'text[]');
    table.string('record');
    table.string('site').defaultTo('yixin').notNull();
    table.timestamp('created_time').defaultTo(knex.fn.now());
}).asCallback(() => {
    console.log('table info has created!');
});

const infoColumn = ['id', 'name', 'short_name', 'copyright', 'record', 'logo',
    'img', 'site'];


module.exports = {
    getSiteInfoBySite: async (ctx) => {
        const { site } = ctx.params;
        try {
            const info = await knex
                .first(infoColumn)
                .where({site: site})
                .from('info');
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
            await knex('info').returning('id').insert(ctx.request.body);
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

    editInfoBySite: async (ctx, next) => {
        const { site } = ctx.params;
        try {
            await knex('info')
                .update(ctx.request.body)
                .where({site});
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
