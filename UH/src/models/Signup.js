const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcrypt');

const SignupSchema = new Schema ({
    cc: {type: Number, required: true, unique: true},
    name: {type: String, required: true},
    numberPhone: {type: Number, required: true}, 
    address: {type: String, required: true}, 
    blood: {type: String, required: true},
    eps: {type: String, required: true},
    email: {type: String, required: true,},
    password: {type: String, required: true},
    // confirmPassword: {type: String, required: true},
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