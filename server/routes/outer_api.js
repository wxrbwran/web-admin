const router = require('koa-router')();
const newsController = require('../controller/news');
const positionController = require('../controller/position');

router.prefix('/api/v0/outer');

// outerApi 无需jsonwebtoken, 供前台页面使用

/* 新闻 */

router.get('/post_articles', newsController.getPostArticles);

router.get('/all_articles', newsController.getAllArticles);

router.get('/article/:id', newsController.getArticleById);

/* 招聘 */
router.get('/post_positions', positionController.getPostPositions);

router.get('/all_positions', positionController.getAllPositions);

router.get('/position/:id', positionController.getPositionById);

module.exports = router;