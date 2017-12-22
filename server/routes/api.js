const router = require('koa-router')();
const ApiController = require('../controller/api');

router.prefix('/api/v0');

router.get('/', ApiController.index);

router.get('/test/:id', ApiController.test);

router.get('/articles', ApiController.getArticles);

router.get('/article/:id', ApiController.getArticleById);

router.post('/article', ApiController.addArticle);

router.patch('/article/:id', ApiController.editArticleById);

router.delete('/article/:id', ApiController.deleteArticleById);

module.exports = router;
