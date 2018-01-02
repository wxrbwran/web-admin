const knex = require('knex')({
    client: 'pg',
    searchPath: 'public',
    connection: {
        // host: '127.0.0.1',
        host: '172.16.10.8',
        user: 'test',
        password: 'qingfei775',
        database: 'web'
    },
    acquireConnectionTimeout: 10000
});

module.exports = {
    knex
};
