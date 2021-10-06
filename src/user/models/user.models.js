const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "username is required"]
    },
    name: {
        type: String,
        required: [true, "name is required"]
    },
    password: {
        type: String,
        required: [true, "password is required"]
    },
	companyId: String,
    companyName: String
	
});

UserSchema.pre("save", async function (next) {
        this.password = await bcrypt.hash(this.password, 12);
        
    next();
})

UserSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
}

const User = mongoose.model('User', UserSchema);

module.exports = User;