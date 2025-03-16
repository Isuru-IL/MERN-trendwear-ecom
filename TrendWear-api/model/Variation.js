const mongoose = require("mongoose");

const variationModel = new mongoose.Schema({
    // id: { type: Number, required: true, unique: true, index: true },
    size: {type: String, required: true},
    color: {type: String, required: true},
    price: {type: Number, required: true},
    quantity: {type: Number, required: true},
    product: {type: mongoose.Schema.Types.ObjectId, ref: "product", required: true}
});


const variation = mongoose.model("variation", variationModel);
module.exports = variation;

