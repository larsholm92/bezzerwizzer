const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    hash: String
})

module.exports = mongoose.model("User", userSchema);