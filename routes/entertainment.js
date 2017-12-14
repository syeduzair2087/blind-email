var express = require('express');
var router = express.Router();
const entertainmentController = require('../controllers/entertainment');

router.get('/getPdfText', entertainmentController.getPdfText);
router.get('/getSong', entertainmentController.getSong);

module.exports = router;