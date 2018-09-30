const proConfig = {
    host: 'dev.cuauwtxtbfew.rds.cn-north-1.amazonaws.com.cn',
    user: 'daqiang',
    password: '(LiHengShaui123)',
    database: 'postgres'
};

const devConfig = {
    host: '127.0.0.1',
    user: 'test',
    password: 'qingfei775',
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
