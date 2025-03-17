// const product = require("../model/Product")
const User = require("../model/User");
const bcrypt = require('bcryptjs');
const dotenv = require("dotenv");
const {sign} = require("jsonwebtoken");
const Product = require("../model/Product");
const Variation = require("../model/Variation");
const Order = require("../model/Order");
dotenv.config();

const OrderController = {



    getAllOrders: async function (req, res, next) {
        try {
            const orders = await Order.find().populate("products");
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    },


    saveOrder: async function (req, res, next) {
        try {
            let {email, firstName, lastName, address, postalCode, city,products,totalPrice} = req.body;

            const order = new Order({email,firstName,lastName,address,postalCode,city,products,totalPrice});

            const savedOrder = await order.save();

            res.status(201).json({message: "Order saved!", product: savedOrder});
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

}

module.exports = OrderController