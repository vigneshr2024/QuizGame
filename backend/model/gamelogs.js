const mongoose = require('mongoose');
const schema = mongoose.Schema;

const gamelogSchema = new schema({
    game_id: {
        type: String,
        required: true
    },
    team: {
        type: String,
        required: true
    },
    question_id: {
        type: String,
        required: true
    },
    user_option: {
        type: String,
        required: true
    },
    is_correct: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: true
    },
    updated_at: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('game_log', gamelogSchema);