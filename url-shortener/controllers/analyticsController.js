const Analytics = require('../models/Analytics');
const URL = require('../models/URL');

exports.trackUrlVisit = async (req, res, next) => {
  const shortUrl = req.params.shortUrl;
  try {
    const url = await URL.findOne({ shortUrl });
    if (!url) return res.status(404).json({ msg: 'URL not found' });

    const analyticsData = new Analytics({
      urlId: url._id,
      ip: req.ip,
      userAgent: req.get('User-Agent')
    });

    await analyticsData.save();
    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
