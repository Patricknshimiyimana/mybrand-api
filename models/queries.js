const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const queriesSchema = new Schema({
    name: {
        type: String,
        // required: true
    },

    email: {
        type: String,
        // required: true
    },

    message: {
        type: String,
        // required: true
    }
    
}, { timestamps: true });

const Queries = mongoose.model('queries', queriesSchema);
module.exports = Queries;

 