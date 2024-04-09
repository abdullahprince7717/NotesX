const mongoose = require("mongoose");
const tagSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    tag_name: {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Tags", tagSchema);