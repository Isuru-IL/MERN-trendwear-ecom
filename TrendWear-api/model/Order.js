var mongoose = require("mongoose");

const productModel = mongoose.Schema({

        "email": {
            require: true,
            type: String
        },
        "firstName": {
            require: true,
            type: String,
        },

        "lastName": {
            require: true,
            type: String
        },

        "address": {
            require: true,
            type: String
        },

        "postalCode": {
            require: true,
            type: String
        },

        "city": {
            require: true,
            type: String
        },

        products: [
            {
                productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
                size:{type:String, required:true},
                quantity: { type: Number, required: true }
            }
            ],

        "totalPrice": {
            require: true,
            type: Number
        },

    },
    {timestamps: true}
)


const order = mongoose.model("order", productModel);
module.exports = order;

