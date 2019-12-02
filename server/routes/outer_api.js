const router = require('koa-router')();
const newsController = require('../controller/news');
const positionController = require('../controller/position');
const infoController = require('../controller/info');
const uploadController = require('../controller/upload');

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

/* 基本信息 */
router.get('/info/:site', infoController.getSiteInfoBySite);

router.post('/paste/txt', uploadController.uploadTxt);

module.exports = router;
