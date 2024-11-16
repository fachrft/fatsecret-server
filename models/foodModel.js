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
                method: "foods.search.v3",
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

exports.searchRecipes = (accessToken, searchQuery, recipeTypes) => {
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
                recipe_types: recipeTypes,
                max_results: 50,
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

exports.findRecipeById = (accessToken, id) => {
    return new Promise((resolve, reject) => {
        const options = {
            method: "POST",
            url: "https://platform.fatsecret.com/rest/server.api",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
            form: {
                method: "recipe.get.v2",
                recipe_id: id,
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




