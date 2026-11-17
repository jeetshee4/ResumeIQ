
const multer = require("multer");

const errorMiddleware = (err, req, res, next) => {

    if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({
                message: "File size cannot exceed 5 MB"
            });
        }

        return res.status(400).json({
            message: err.message
        });
    }

    if (err) {
        return res.status(400).json({
            message: err.message
        });
    }

    next();
};

module.exports = errorMiddleware;
