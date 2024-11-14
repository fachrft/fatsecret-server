const express = require('express');
const router = express.Router();
const { getToken, searchFood, findFoodByID, searchRecipes, naturalLanguageProcessing, recognizeImage } = require('../controllers/foodController');
const fetchAccessToken  = require('../middleware/token')
const {upload, convertImageToBase64} = require('../middleware/uploadImage')

router.post('/get-token', getToken);
router.post('/search', fetchAccessToken, searchFood);
router.post('/search/:id', fetchAccessToken, findFoodByID);
router.post('/recipes-search', fetchAccessToken, searchRecipes);
router.post('/nlp', fetchAccessToken, naturalLanguageProcessing)
router.post("/recognize-image", fetchAccessToken, upload.single("image"), convertImageToBase64, recognizeImage);

module.exports = router