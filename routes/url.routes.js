const express = require('express');
const router = express.Router();
const { createShortUrl } = require('../controllers/url.controller');

router.post('/shorturls', createShortUrl);

module.exports = router;
