const mongoose = require('mongoose');
const {Schema} = mongoose;
// se crea un nuevo esquema para las EPS
const NoteSchema = new Schema ({
    eps: {type: String, required: true},
    description: {type: String, required: true},
    nit: {type: Number, required: true},
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Note',NoteSchema);
