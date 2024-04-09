const mongoose = require("mongoose");
const sessionSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        unique: true,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Sessions", sessionSchema);