const mongoose = require("mongoose");
const noteSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    note_title: {
        type: String,
        required: true,
    },
    note_description: {
        type: String,
        required: true,
    },
    note_image: {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Notes", noteSchema);