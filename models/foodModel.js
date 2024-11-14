const request = require("request");
require("dotenv").config();
const clientID = process.env.APP_ID;
const clientSecret = process.env.APP_SECRET;

exports.requestToken = () => {
    return new Promise((resolve, reject) => {
        const options = {
            method: "POST",
            url: "https://oauth.fatsecret.com/connect/token",
            auth: {
                user: clientID,
                password: clientSecret,
            },
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            form: {
                grant_type: "client_credentials",
                scope: "premier",
            },
            json: true,
        };

        request(options, (error, response, body) => {
            if (error) return reject(error);
            resolve(body);
        });
    });
};

exports.searchFood = (accessToken, searchQuery, locale) => {
    return new Promise((resolve, reject) => {
        const options = {
            method: "POST",
            url: "https://platform.fatsecret.com/rest/server.api",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
            form: {
                method: "foods.search",
                search_expression: searchQuery,
                format: "json",
                locale: locale,
            },
            json: true,
        };

        request(options, (error, response, body) => {
            if (error) return reject(error);
            resolve(body);
        });
    });
};

exports.findFoodById = (accessToken, id) => {
    return new Promise((resolve, reject) => {
        const options = {
            method: "POST",
            url: "https://platform.fatsecret.com/rest/server.api",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
            form: {
                method: "food.get.v4",
                food_id: id,
                format: "json",
            },
            json: true,
        };
        request(options, (error, response, body) => {
            if (error) return reject(error);
            resolve(body);
        });
    });
};

exports.searchRecipes = (accessToken, searchQuery) => {
    return new Promise((resolve, reject) => {
        const options = {
            method: "POST",
            url: "https://platform.fatsecret.com/rest/server.api",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
            form: {
                method: "recipes.search.v3",
                search_expression: searchQuery,
                format: "json",
            },
            json: true,
        };
        request(options, (error, response, body) => {
            if (error) return reject(error);
            resolve(body);
        });
    });
};

exports.processNaturalLanguage = (accessToken, input, region = "US", language = "en", includeFoodData = true, eatenFoods = []) => {
    return new Promise((resolve, reject) => {
        const options = {
            method: "POST",
            url: "https://platform.fatsecret.com/rest/natural-language-processing/v1",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
            form: {
                user_input: input,
                region,
                language,
                include_food_data: includeFoodData,
                eaten_foods: JSON.stringify(eatenFoods)
            },
            
            json: true
        };

        request(options, (error, response, body) => {
            if (error) return reject(error);
            if (response.statusCode !== 200) {
                return reject(new Error(`Failed with status ${response.statusCode}: ${body.message}`));
            }
            resolve(body);
        });
    });
};

exports.imageRecognition = (accessToken, imageBase64) => {
    return new Promise((resolve, reject) => {
        const options = {
            method: "POST",
            url: "https://platform.fatsecret.com/rest/image-recognition/v1",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/form-data",
            },
            form: {
                image: imageBase64, // gambar dalam format Base64
                format: "json",
            },
            json: true,
        };

        request(options, (error, response, body) => {
            if (error) return reject(error);
            resolve(body); // mengembalikan hasil pengenalan gambar
        });
    });
};



