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
    teams : [{
        team_id: String,
        role: {
            type: String,
            enum: ["admin", "member"]
        }
    }]
});

UserSchema.pre("save", async function (next) {
        this.password = await bcrypt.hash(this.password, 12);
        
    next();
})

const User = mongoose.model('User', UserSchema);

module.exports = User;