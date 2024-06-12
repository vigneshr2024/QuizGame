const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    language: {
        required: true,
        type: String
    },
    level: {
        required: true,
        type: String
    },
    question: {
        required: true,
        type: String
    },
    a: {
        required: true,
        type: String
    },
    b: {
        required: true,
        type: String
    },
    c: {
        required: true,
        type: String
    },
    d: {
        required: true,
        type: String
    },
    correct_option: {
        required: true,
        type: String
    }

});

module.exports = mongoose.model('question', dataSchema);