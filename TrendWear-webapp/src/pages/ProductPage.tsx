import {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {motion} from 'framer-motion';
import {Minus, Plus} from 'lucide-react';
import {useCart} from '../context/CartContext';
import toast from 'react-hot-toast';
import {fetchProducts, fetchProductsById} from "../api/Product.ts";
import {Product} from "../types";
import SingleProductSkeleton from "../components/skeltons/SingleProductSkeleton.tsx";

// const recommendations = Array.from({length: 4}, (_, i) => ({
//     id: i + 2,
//     name: `Related Product ${i + 1}`,
//     price: 89.99 + i * 10,
//     image: `https://images.unsplash.com/photo-${
//         i === 0 ? '1515886657613-9f3515b0c78f' :
//             i === 1 ? '1496747611176-843db0904432' :
//                 i === 2 ? '1552374196-1ab2a1c593e9' :
//                     '1549298916-b41d501d3772'
//     }?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`
// }));

export default function ProductPage() {

    let {id} = useParams();
    const {addToCart} = useCart();
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);

    const [price, setSelectedSizePriceToProduct] = useState('0');



    const [product, setProductData] = useState<Product>();
    const [recommendedProduct, setRecommendedProductData] = useState<Product[]>([]);


    //fetch single product
    async function fetchProduct() {
        const data = await fetchProductsById(id)
        if (data){
            setProductData(data)
        }
    }

    // fetch all product
    async function fetchAll() {
        const data = await fetchProducts()
        if (data){
            setRecommendedProductData(data)

        }
    }

    //load data
    useEffect(() => {
        fetchProduct();
        fetchAll();


    }, []);

    const handleAddToCart = () => {
        if (!selectedSize) {
            toast.error('Please select size');
            return;
        }

        let productId=id
        id=id+selectedSize;


        addToCart({
            ...product,
            quantity,
            selectedSize,
            price,
            id,
            productId

        });

        toast.success('Added to cart', {duration: 3000});
    };


    const setSelectedSizeOnClick = (variation:any) => {
        setSelectedSize(variation);

        if (!product) return;

        const selectedVariation = product.variations.find(
            (v) => v.size === variation
        );

        if (selectedVariation) {
            setSelectedSizePriceToProduct(selectedVariation.price.toFixed(2));
        }
    };

    return (
        <div className="container mx-auto px-4 py-32">
            {product ?
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Product Images */}
                    <div className="space-y-4">
                        <div className="aspect-square relative overflow-hidden rounded-lg">
                            {/*<img*/}
                            {/*    // src={product?.images[0]}*/}
                            {/*    src={product?.images[selectedImage]}*/}
                            {/*    alt={product?.name}*/}
                            {/*    className="absolute inset-0 w-full h-full object-cover"*/}
                            {/*/>*/}

                            {product?.images[selectedImage] ? (
                                <img
                                    src={product?.images[selectedImage]}
                                    alt={product?.name}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            ) : (
                                <div
                                    className="w-full h-full bg-gray-100 animate-pulse bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300">
                                    {/* Optional content to enhance the skeleton experience */}
                                </div>)}
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {product?.images.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    className={`aspect-square relative overflow-hidden rounded-lg ${
                                        selectedImage === index ? 'ring-2 ring-black' : ''
                                    }`}
                                >
                                    <img
                                        src={image}
                                        alt={`${product?.name} ${index + 1}`}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold">{product?.name}</h1>
                            <p className="text-2xl mt-2">
                                {/*LKR {price === 0 ? product?.variations[0].price.toFixed(2).toLocaleString():price}*/}
                                $ {price === '0' ? product?.variations[0].price.toFixed(2) : price}
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-2">Size</h3>
                            <div className="grid grid-cols-5 gap-2">
                                {product?.variations?.map(variation => (
                                    <button
                                        // key={variation.id}
                                        onClick={() => setSelectedSizeOnClick(variation.size)}
                                        className={`py-2 border rounded ${
                                            selectedSize === variation.size
                                                ? 'bg-black text-white border-black'
                                                : 'border-gray-200 hover:border-black'
                                        }`}
                                    >
                                        {variation.size}
                                    </button>
                                ))}
                            </div>
                        </div>


                        <div>
                            <h3 className="font-semibold mb-2">Quantity</h3>
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                    className="p-2 border rounded-full hover:bg-gray-100"
                                >
                                    <Minus size={20}/>
                                </button>
                                <span className="text-xl">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(q => q + 1)}
                                    className="p-2 border rounded-full hover:bg-gray-100"
                                >
                                    <Plus size={20}/>
                                </button>
                            </div>
                        </div>

                        <div className="flex space-x-4">
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 bg-black text-white py-3 rounded-full hover:bg-gray-900 transition-colors"
                            >
                                Add to Cart
                            </button>
                            {/*<button className="p-3 border rounded-full hover:bg-gray-100">*/}
                            {/*    <Heart size={24}/>*/}
                            {/*</button>*/}
                        </div>

                        <div>
                            <h3 className="font-semibold mb-2">Description</h3>
                            <p className="text-gray-600">{product?.description}</p>
                        </div>
                    </div>
                </div>
                :
                <SingleProductSkeleton/>
            }

            {/* Recommendations */}
            <div className="mt-20">
                <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {recommendedProduct.slice(0,4)?.map(product => (
                        <motion.div
                            key={product._id}
                            whileHover={{y: -10}}
                            className="group"
                        >
                            <Link to={`/product/${product._id}`}>
                                <div className="aspect-[3/4] relative overflow-hidden rounded-lg mb-4">
                                    <img
                                        src={product.images[0]}
                                        alt={product.name}
                                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>

                                <h3 className="font-semibold">{product.name}</h3>
                                <p className="text-gray-600">$ {product.variations[0].price}</p>
                            </Link>

                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}