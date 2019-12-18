const crypto = require('crypto');
const { knex} = require('../config/db');
const jsonwebtoken  = require('jsonwebtoken');
const tokenConfig = require('../config/token');

// console.log(tokenConfig);

knex.schema.withSchema('web_fx').createTableIfNotExists('users', function(table) {
    table.increments();
    table.text('username').notNull();
    table.text('password').notNull();
    table.timestamp('created_time').defaultTo(knex.fn.now());
}).asCallback(() => {
    console.log('table users has created!');
});

const SALT = 'yixin';
const SECRET = 'admin';

module.exports = {
    login: async (ctx) => {
        try {
            const { username, password } = ctx.request.body;
            const hmac = crypto.createHmac('sha256', SECRET);
            hmac.update(`${password}${SALT}`);
            const cryptoPassword =hmac.digest('hex');
            console.log('cryptoPassword', cryptoPassword);
            const result = await knex('users')
                .count('username')
                .where({
                   username,
                   password:  cryptoPassword
                })
                .first();
            if (+result.count > 0) {
                const tokenData = { username };
                const token = jsonwebtoken.sign(
                    tokenData,
                    tokenConfig.secret,
                    {
                        expiresIn: tokenConfig.expired
                    });
                const refresh_token = jsonwebtoken.sign(
                    tokenData,
                    tokenConfig.secret,
                    {
                        expiresIn: tokenConfig.refresh,
                    });
                return ctx.body = {
                    status: 'success',
                    data: {
                        token,
                        refresh_token
                    },
                };
            } else {
                return ctx.body = {
                    status: 'fail',
                    data: '用户名或密码错误，请重新输入',
                };
            }
        } catch (e) {
            return ctx.body = {
                status: 'fail',
                data: e.stack,
            };
        }
    },
};
