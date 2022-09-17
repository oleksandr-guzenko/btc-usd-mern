const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecordSchema = {
    before: {
        type: Number,
        required: true
    },
    after: {
        type: Number,
        required: true
    },
    mode: {
        type: String,
        required: true
    },
    guessResult: {
        type: Boolean,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    timestamp: {
        type: Date,
        required: true,
        default: Date.now
    }
}

module.exports = mongoose.model('records', RecordSchema);