const mongoose = require('mongoose');

//create user schema

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    
},{"strict":"throw"})

//create model 
const User = mongoose.model('user',UserSchema);

module.exports = User;