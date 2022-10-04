const mongoose = require("mongoose");

const imgSchema = new mongoose.Schema({
    name: String,
    data: Buffer,
    img: {
        data: Buffer,
        contentType: String,
    },
});

module.exports = ImageModel = mongoose.model("Image", imgSchema);