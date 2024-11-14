const express = require("express");
const dotenv = require("dotenv");
const foodRoutes = require("./routes/foodRoutes");

dotenv.config();
const app = express();

app.use(express.json());
app.use("/food", foodRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
