const proConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: 'feadmin'
};

const devConfig = {
    host: '127.0.0.1',
    // host: 'http://172.16.10.162',
    user: 'wuxiaoran',
    password: 'test',
    database: 'web'
};

const knex = require('knex')({
    client: 'pg',
    searchPath: 'web_fx',
    connection: process.env.NODE_ENV === 'production' ? proConfig : devConfig,
    acquireConnectionTimeout: 10000
});
const jwtsecret = 'wxrrua';

module.exports = {
    knex,
    jwtsecret
};
