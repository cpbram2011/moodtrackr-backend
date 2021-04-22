const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TrackSchema = Schema({
    name: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    // entries: {
    //     type: Array, // of obj_id => entryobject
    // }
}, {timestamps: true
});

TrackSchema.index({name: 1, user_id: 1}, {unique: true})

module.exports = Track = mongoose.model('Track', TrackSchema)