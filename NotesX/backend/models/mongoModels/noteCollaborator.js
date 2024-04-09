const mongoose = require("mongoose");
const noteCollaboratorsSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    note_id: {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("noteCollaborator", noteCollaboratorsSchema);