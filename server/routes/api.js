const router = require('koa-router')();
const ApiController = require('../controller/api');

router.prefix('/api/v0');

router.get('/', ApiController.index);

router.get('/test/:id', ApiController.test);

router.get('/article', ApiController.getArticle);

router.post('/article', ApiController.addArticle);

module.exports = router;
