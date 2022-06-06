const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcrypt'); //plugging para encriptar contenido en este caso la contraseña

const SignupSchema = new Schema ({
    cc: {type: Number, required: true, unique: true},
    name: {type: String, required: true},
    numberPhone: {type: Number, required: true}, 
    address: {type: String, required: true}, 
    blood: {type: String, required: true},
    eps: {type: String, required: true},
    email: {type: String, required: true,},
    password: {type: String, required: true},
    // type: {type: Number, required: true},
    status: {type: String, required: true},
    date: {type: Date, default: Date.now}
});

/* ENCRYPT THE PASSWORD */
SignupSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);
    return hash;
};

/* MATH THE PASSWORDS ({PASSWORD DB} WITH {PASSWORD INSERTED THE USER}) */
SignupSchema.methods.matchPassword = function (password) {
    return bcrypt.compare(password, this.password).then();
} 

module.exports = mongoose.model('Signup',SignupSchema);