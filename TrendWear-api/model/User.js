var mongoose = require("mongoose");

const userModel = mongoose.Schema({

        "email": {
            require: true,
            unique:true,
            type: String,
        },

        "password": {
            require: true,
            type: String
        },

        "role": {
            require: true,
            type: String
        },

    },
    {timestamps: true}
)


const user = mongoose.model("user", userModel);
module.exports = user;

