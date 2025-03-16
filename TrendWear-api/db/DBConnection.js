const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL;

const DBConnection = async () => {
    try {
        var conn = await mongoose.connect(MONGODB_URL);
        console.log(`MongoDB connected to : ${conn.connection.host}`)
    } catch (err) {
        console.error("Error connecting to mongodb cluster: " + err)
    }
}

module.exports = DBConnection;