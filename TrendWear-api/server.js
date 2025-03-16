require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");


// const authRoutes = require('./routes/authRoutes');
var productRouter = require('./routes/ProductRoutes');


const app = express();
app.use(cors())
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json({limit: '50mb'}));

//db connection
var DBConnection = require('./db/DBConnection');
DBConnection();

//routes
app.use('/api/v1/products', productRouter);


const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


