const knex = require('knex')({
    client: 'pg',
    searchPath: 'public',
    connection: {
        host: '127.0.0.1',
        user: 'test',
        password: 'qingfei775',
        database: 'web'
    },
    acquireConnectionTimeout: 10000
});

const bs = require('bookshelf')(knex);
const News = bs.Model.extend({
    tableName: 'news'
});

const Positions = bs.Model.extend({
    tableName: 'position'
});

module.exports = {
    News,
    Positions,
    knex,
};
