const express = require('express');
const router = express.Router();
const { trackUrlVisit } = require('../controllers/analyticsController');

router.get('/:shortUrl', trackUrlVisit, (req, res) => {
  const shortUrl = req.params.shortUrl;
  const url = URL.findOne({ shortUrl });
  res.redirect(url.originalUrl);
});

module.exports = router;
