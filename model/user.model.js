const bcrypt = require('bcrypt');

const mongoose = require('../db');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre('save', async function(next) {

    try {

        let salt = await bcrypt.genSalt(8);
        let hash = await bcrypt.hash(this.password, salt);

        this.password = hash;

        return next();

    } catch(err) {

        return next(err);
    }
});

userSchema.methods.isValidPassword = async function(password) {

    try {

        let result = await bcrypt.compare(password, this.password);

        if(result)
            return true;
        else
            return false;
            
    } catch(err) {

        return false;
    }
}

const User = mongoose.model('User', userSchema);

module.exports = User;