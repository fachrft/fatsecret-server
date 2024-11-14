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
        console.log(search);
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
    const { search } = req.body;
    console.log(req.accessToken);
    try {
        const result = await foodModel.searchRecipes(req.accessToken, search);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.naturalLanguageProcessing = async (req, res) => {
    const { input, region = "US", language = "en", includeFoodData = true, eatenFoods = [] } = req.body;
    try {
        const result = await foodModel.processNaturalLanguage(req.accessToken, input, region, language, includeFoodData, eatenFoods);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.recognizeImage = async (req, res) => {
    // Pastikan gambar sudah dikonversi ke Base64 di middleware
    const { imageBase64 } = req;
    // console.log(imageBase64)

    if (!imageBase64) {
        return res.status(400).json({ error: "No image Base64 data found" });
    }

    try {
        // Panggil fungsi imageRecognition di model dengan accessToken dan gambar dalam Base64
        const result = await foodModel.imageRecognition(req.accessToken, imageBase64);
        res.json(result); // Kembalikan hasil pengenalan gambar ke klien
    } catch (error) {
        res.status(500).send(error.message); // Kirim pesan error jika terjadi kesalahan
    }
};
