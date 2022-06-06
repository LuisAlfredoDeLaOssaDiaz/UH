const mongoose = require('mongoose');
const {Schema} = mongoose;

const AppointmentSchema = new Schema ({
        cc: {type: String, required: true},
        typeAppointment: {type: String, required: true},
        description: {type: String, required: true},
        // cant : {type: Number, required: true},
        date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Appointment',AppointmentSchema);
