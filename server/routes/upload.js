const router = require('koa-router')();
const uploadController = require('../controller/upload');

router.prefix('/upload');

router.post('/img/cover', uploadController.uploadImgCover);

router.post('/img/logo', uploadController.uploadImgLogo);

router.post('/img/loop', uploadController.uploadImgLoop);

module.exports = router;
