const foodModel = require("../models/foodModel");

exports.getToken = async (req, res) => {
    try {
        const token = await foodModel.requestToken();
        res.json(token);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.searchFood = async (req, res) => {
    const { search, locale = "en_US" } = req.body;
    try {
        const result = await foodModel.searchFood(req.accessToken, search, locale);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.findFoodByID = async (req, res) => {
    const id = req.params.id;
    // console.log(id);
    try {
        const result = await foodModel.findFoodById(req.accessToken, id);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.searchRecipes = async (req, res) => {
    const { search, types } = req.body;
    // console.log(req.accessToken);
    try {
        const result = await foodModel.searchRecipes(req.accessToken, search, types);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.findRecipeByID = async (req, res) => {
    const id = req.params.id;
    // console.log(id);
    try {
        const result = await foodModel.findRecipeById(req.accessToken, id);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};


