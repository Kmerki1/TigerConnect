const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    displayName: {type: String, required: true},
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, 
    fname: String, 
    lname: String, 
    age: Number, 
},{ timestamps: true });

//encrypt da password
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});

const User = mongoose.model('Users', userSchema);

module.exports = User;
