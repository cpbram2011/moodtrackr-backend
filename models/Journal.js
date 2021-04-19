const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JournalSchema = Schema({
    name: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
}, {timestamps: true
});


module.exports = Journal = mongoose.model('Journal', JournalSchema)