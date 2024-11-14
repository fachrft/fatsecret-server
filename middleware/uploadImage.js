const multer = require("multer");
const fs = require("fs");
const path = require("path");

const upload = multer({ dest: "uploads/" });

const convertImageToBase64 = (req, res, next) => {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const filePath = path.join(__dirname, "../uploads", req.file.filename);

    fs.readFile(filePath, (err, data) => {
        if (err) return res.status(500).json({ error: "File conversion error" });

        req.imageBase64 = data.toString("base64");

        // Hapus file setelah dikonversi ke Base64
        fs.unlinkSync(filePath);
        next();
    });
};

module.exports = { upload, convertImageToBase64 };
