require('dotenv').config();
const ShortUrl = require('../models/url.model');
const { nanoid } = require('nanoid');

const BASE_URL = process.env.BASE_URL;
const isValidShortcode = code => /^[a-zA-Z0-9]{4,20}$/.test(code);

exports.createShortUrl = async (req, res) => {
  const { url, shortcode, validity } = req.body;
  if (!url) return res.status(400).json({ error: 'url is required' });

  let code = shortcode;

  if (shortcode) {
    if (!isValidShortcode(shortcode)) {
      return res.status(400).json({ error: 'Shortcode must be alphanumeric and 4–20 characters' });
    }
    const taken = await ShortUrl.findOne({ shortcode });
    if (taken) return res.status(409).json({ error: 'Shortcode already in use' });
  } else {
    let exists;
    do {
      code = nanoid(6);
      exists = await ShortUrl.findOne({ shortcode: code });
    } while (exists);
  }

  const now = new Date();
  const duration = typeof validity === 'number' && validity > 0 ? validity : 30;
  const expiresAt = new Date(now.getTime() + duration * 60000);

  await ShortUrl.create({ url, shortcode: code, expiresAt });

  res.status(201).json({
    shortLink: `${BASE_URL}/${code}`,
    expiry: expiresAt.toISOString()
  });
};
