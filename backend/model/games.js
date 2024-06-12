const mongoose = require('mongoose');
const schema = mongoose.Schema;

const gameSchema = new schema({
    teama_playername: {
        type: String,
        required: true
    },
    teamb_playername: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    game_id: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        required: true
    },
    updated_at: {
        type: Date,
        required: true
    },
    deleted_at: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('games', gameSchema);