const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const foodRoutes = require("./routes/foodRoutes");


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => res.send("Express on Vercel"));
app.use("/food", foodRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
