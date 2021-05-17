const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const TeamSchema = new mongoose.Schema({
    members: [{
        email : String,
        status: {
                type: String,
                enum: ["active", "pending", "disable"]
            },
        role: {
                type: String,
                enum: ["admin", "member"]
        }
    }],
    name: {
        type: String,
        required: [true, "name is required"]
    },
    password: {
        type: String,
        required: [true, "password is required"]
    }
        
        
});

TeamSchema.pre("save", async function (next) {
        this.password = await bcrypt.hash(this.password, 12);
        
    next();
})

TeamSchema.methods.correctPassword = async function (candidatePassword, teamPassword) {
    return await bcrypt.compare(candidatePassword, teamPassword);
}

const Team = mongoose.model('Team', TeamSchema);

module.exports = Team;