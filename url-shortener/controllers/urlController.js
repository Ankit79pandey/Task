const URL = require('../models/URL');
const { validateUrl } = require('../utils/validateUrl');

// Dynamically import nanoid
let nanoid;
(async () => {
  nanoid = (await import('nanoid')).nanoid;
})();

exports.createShortUrl = async (req, res) => {
  const { originalUrl, alias, expirationDate } = req.body;
  if (!validateUrl(originalUrl)) return res.status(400).json({ msg: 'Invalid URL' });

  // Use the nanoid function once it's loaded
  const shortUrl = alias || nanoid(6);
  const userId = req.user.id;

  try {
    const url = new URL({ originalUrl, shortUrl, userId, expirationDate, alias });
    await url.save();
    res.status(201).json(url);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getShortUrls = async (req, res) => {
  const userId = req.user.id;
  try {
    const urls = await URL.find({ userId });
    res.json(urls);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updateUrl = async (req, res) => {
  const { urlId, newOriginalUrl, newAlias, newExpirationDate } = req.body;

  try {
    const url = await URL.findById(urlId);
    if (!url) return res.status(404).json({ msg: 'URL not found' });

    if (newOriginalUrl) url.originalUrl = newOriginalUrl;
    if (newAlias) url.alias = newAlias;
    if (newExpirationDate) url.expirationDate = newExpirationDate;

    await url.save();
    res.json(url);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.deleteUrl = async (req, res) => {
  const { urlId } = req.body;

  try {
    const url = await URL.findByIdAndDelete(urlId);
    if (!url) return res.status(404).json({ msg: 'URL not found' });

    res.json({ msg: 'URL deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
