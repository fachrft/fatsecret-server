const express = require("express");
const router = express.Router();
const { getToken, searchFood, findFoodByID, searchRecipes, findRecipeByID } = require("../controllers/foodController");
const fetchAccessToken = require("../middleware/token");


router.post("/get-token", getToken);
router.post("/search", fetchAccessToken, searchFood);
router.post("/search/:id", fetchAccessToken, findFoodByID);
router.post("/recipes-search", fetchAccessToken, searchRecipes);
router.post("/recipes/:id", fetchAccessToken, findRecipeByID);

module.exports = router;
