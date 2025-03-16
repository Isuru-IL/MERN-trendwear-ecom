var mongoose = require("mongoose");

const productModel = mongoose.Schema({

        "name": {
            require: true,
            type: String,
        },

        "description": {
            require: true,
            type: String
        },

        "images": {
            require: true,
            type: [String]
        }
        ,
        "category": {
            require: true,
            type: String
        },
        variations: [{type: mongoose.Schema.Types.ObjectId, ref: "variation"}]
    },
    {timestamps: true}
)


const product = mongoose.model("product", productModel);
module.exports = product;

