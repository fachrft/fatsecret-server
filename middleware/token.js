const foodModel = require('../models/foodModel');

const fetchAccessToken = async (req, res, next) => {
  try {
    const tokenResponse = await foodModel.requestToken();
    req.accessToken = tokenResponse.access_token;
    next(); // Lanjut ke controller
  } catch (error) {
    res.status(500).send('Failed to get access token');
  }
};

module.exports = fetchAccessToken;
