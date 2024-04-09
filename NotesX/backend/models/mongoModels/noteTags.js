const mongoose = require("mongoose");
const noteTagsSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    tag_id: {
        type: String,
        required: true,
    },
    note_id: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("noteTag", noteTagsSchema);