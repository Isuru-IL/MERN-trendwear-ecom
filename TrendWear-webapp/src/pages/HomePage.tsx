import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ProductSkeleton from "../components/skeltons/ProductSkeleton.tsx";
import {useEffect, useState} from "react";
import {fetchProducts} from "../api/Product.ts";

export default function HomePage() {
    const [products, setProductData] = useState([]);

    async function fetchAll() {
        const data = await fetchProducts()
        if (data){
            // @ts-ignore
            setProductData(data)
        }
    }

    //load data
    useEffect(() => {
        fetchAll();

    }, []);

  return (
      <div className="space-y-20">
          {/* Hero Section */}
          <section className="relative h-[100vh] flex items-center">
              <div
                  className="absolute inset-0 z-0"
                  style={{
                      backgroundImage: 'url(https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=2071)',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                  }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-50"/>
              <div className="container mx-auto px-4 z-10">
                  <motion.div
                      initial={{opacity: 0, y: 20}}
                      animate={{opacity: 1, y: 0}}
                      transition={{duration: 0.8}}
                      className="max-w-3xl mx-auto text-center text-white"
                  >
                      <h1 className="text-5xl md:text-7xl font-bold mb-6">Elevate Your Wardrobe</h1>
                      <p className="text-xl md:text-2xl mb-8">Curated collections that blend timeless elegance with
                          contemporary fashion. Where style meets sophistication.</p>
                      <Link
                          to="/shop"
                          className="inline-flex items-center px-8 py-3 bg-white text-black rounded-full hover:bg-gray-100 transition-colors"
                      >
                          Explore Collection
                          <ArrowRight className="ml-2 w-5 h-5"/>
                      </Link>
                  </motion.div>
              </div>
          </section>

          {/* Featured Categories */}
          <section className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8 text-center">Shop by Category</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {['Women', 'Men', 'Kids'].map((category) => (
                      <motion.div
                          key={category}
                          whileHover={{scale: 1.03}}
                          className="relative h-[400px] rounded-lg overflow-hidden cursor-pointer"
                      >
                          <div
                              className="absolute inset-0 bg-cover bg-center"
                              style={{
                                  backgroundImage: `url(https://images.unsplash.com/photo-${
                                      category === 'Women' ? '1487412720507-e7ab37603c6f' :
                                          category === 'Men' ? '1492562080023-ab3db95bfbce' :
                                              '1622290291468-a28f7a7dc6a8'
                                  }?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80)`
                              }}
                          />
                          <div
                              className="absolute inset-0 bg-black bg-opacity-30 transition-opacity hover:bg-opacity-20"/>
                          <div className="absolute bottom-0 left-0 right-0 p-6">
                              <h3 className="text-2xl font-bold text-white">{category}</h3>
                          </div>
                      </motion.div>
                  ))}
              </div>
          </section>

          {/* New Arrivals */}
          <section className="bg-gray-50 py-20">
              <div className="container mx-auto px-4">
                  <h2 className="text-3xl font-bold mb-8 text-center">New Arrivals</h2>

                  {products.length > 0 ?
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                          {products.slice(0, 4).map((product: any) => (
                              <Link to={`/product/${product._id}`}>
                                  <motion.div
                                      key={product._id}
                                      whileHover={{y: -10}}
                                      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                                  >
                                      <div className="aspect-[3/4] relative overflow-hidden">
                                          <img
                                              src={product?.images[0]}
                                              alt="Product"
                                              className="absolute inset-0 w-full h-full object-cover"
                                          />
                                      </div>
                                      <div className="p-4">
                                          <h3 className="font-semibold mb-2">{product?.name}</h3>
                                          <p className="text-gray-600">$ {product.variations[0].price}</p>
                                      </div>
                                  </motion.div>
                              </Link>
                          ))}
                      </div>
                      :
                      <ProductSkeleton/>
                  }
              </div>
          </section>

          {/* Collection Banner */}
          <section className="container mx-auto px-4 pb-40">
              <div className="relative h-[500px] rounded-lg overflow-hidden">
                  <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                          backgroundImage: 'url(https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)'
                      }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40"/>
                  <div className="absolute inset-0 flex items-center justify-center text-white text-center">
                      <motion.div
                          initial={{opacity: 0, y: 20}}
                          whileInView={{opacity: 1, y: 0}}
                          viewport={{once: true}}
                          className="max-w-2xl px-4"
                      >
                          <h2 className="text-4xl md:text-5xl font-bold mb-4">Autumn Essentials</h2>
                          <p className="text-xl mb-8">Embrace the season with our carefully curated autumn
                              collection</p>
                          <Link
                              to="/shop"
                              className="inline-flex items-center px-8 py-3 bg-white text-black rounded-full hover:bg-gray-100 transition-colors"
                          >
                              Shop Now
                              <ArrowRight className="ml-2 w-5 h-5"/>
                          </Link>
                      </motion.div>
                  </div>
              </div>
          </section>

          {/* Features */}
          {/*<section className="container mx-auto px-4 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Free Shipping', description: 'On orders over $100' },
            { title: 'Easy Returns', description: '30-day return policy' },
            { title: 'Secure Payment', description: '100% secure checkout' }
          ].map((feature) => (
            <motion.div
              key={feature.title}
              whileHover={{ scale: 1.05 }}
              className="text-center p-6"
            >
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>*/}
      </div>
  );
}