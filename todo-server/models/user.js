var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = Schema({
    email: { type: String, required:true},
    //username: { type: String, required: true},
    password: { type: String, required: true},
    token: {type: String, require: true}
});

module.exports = mongoose.model('User', UserSchema);