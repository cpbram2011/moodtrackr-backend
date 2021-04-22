const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TrackEntrySchema = Schema({
    text: {
        type: String,
    },
    rating: {
        type: Number
    },
    date: {
        type: Date,
        required: true
    },
    track_id: {
        type: String,
        required: true
    },
}, {timestamps: true
});

TrackEntrySchema.index({track_id: 1, date: 1}, {unique: true})

module.exports = TrackEntry = mongoose.model('TrackEntry', TrackEntrySchema)