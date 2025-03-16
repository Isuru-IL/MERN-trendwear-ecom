// const product = require("../model/Product")
const Product = require("../model/Product");
const Variation = require("../model/Variation");

const productController = {

    getAllProducts: async function (req, res, next) {
        try {
            const products = await Product.find().populate("variations");
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    },

    saveProducts: async function (req, res, next) {
        try {
            let {id, name, description, images, category, variations} = req.body;
            const product = new Product({id, name, description, images, category});

            for (const variation of variations) {
                const savedVariation = await new Variation({...variation, product: product._id}).save();
                product.variations.push(savedVariation._id);
            }

            const savedProduct = await product.save();

            res.status(201).json({message: "Product with variations saved!", product: savedProduct});
        } catch (error) {
            res.status(500).json({error: error.message});
        }

    },

    updateProducts: async function (req, res, next) {
        try {
            let {_id, name, description, images, category, variations} = req.body;

            const updatedProduct = await Product.findOneAndUpdate(
                {_id},
                {$set: {name, description, images, category}},
                {upsert: true}
            );

            if (variations && variations.length > 0) {
                for (const variation of variations) {
                    if (variation._id) {

                        await Variation.updateOne(
                            {_id: variation._id},
                            {$set: {...variation, product: updatedProduct._id}},
                            {upsert: true}
                        );
                    } else {

                        const savedVariation = await new Variation({...variation, product: _id}).save();
                        console.log(updatedProduct._id)

                        await Product.updateOne(
                            {_id: updatedProduct._id},
                            {$addToSet: {variations: savedVariation._id}}
                        );
                    }
                }
            }


            res.status(200).json({message: "Product with variations updated!", product: updatedProduct});
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    },

    getProductById: async function (req, res, next) {
        console.log('dd')
        try {
            const {id} = req.params;

            const product = await Product.findOne({"_id":id}).populate("variations");

            if (!product) {
                return res.status(404).json({message: "Product not found"});
            }

            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    },

    deleteProduct: async function (req, res, next) {
        try {
            const {id} = req.params;
            console.log(id)
            const product = await Product.deleteOne({"_id": id})

            if (!product) {
                return res.status(404).json({message: "Product not found"});
            }

            res.status(200).json({message: "Product deleted successfully!",product});
        } catch (error) {
            res.status(500).json({error: error.message});
        }

    }


}

module.exports = productController