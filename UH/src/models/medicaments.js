const mongoose = require('mongoose');
const {Schema} = mongoose;

const MedicamentsSchema = new Schema ({
    id_patient: {type: Number, required: true},
    name: {type: String, required: true},
    description_function: {type: String, required: true},
    content: {
        river : {type: String, required: true},
        cons : {type: String, required: true},
        },
    ingest : {type: String, required: true},
    weight_mg : {type: Number, required: true},
    nit : {type: Number, required: true},
    date: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Drug',MedicamentsSchema);
