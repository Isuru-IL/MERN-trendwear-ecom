import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <div className="space-y-20 py-10">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1604014237800-1c9102c219da?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="container mx-auto px-4 z-10">
            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                className="max-w-3xl mx-auto text-center text-white"
            >
                <h1 className="text-5xl font-bold mb-6">Crafting Excellence</h1>
                <p className="text-xl">Redefining luxury fashion since 2015</p>
            </motion.div>
        </div>
      </section>

        {/* Mission Section */}
        <section className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-6">Our Purpose</h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                    At the intersection of artisanal craftsmanship and contemporary design, we create pieces that transcend seasons. Our dedication to sustainable luxury and innovative design practices ensures that each garment tells a story of excellence and responsibility.
                </p>
            </div>
        </section>

        {/* Values */}
        <section className="bg-gray-50 py-20">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-12 text-center">Core Values</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            title: 'Artisanal Excellence',
                            description: 'Every piece is crafted with meticulous attention to detail, combining traditional techniques with modern innovation.'
                        },
                        {
                            title: 'Conscious Creation',
                            description: 'We prioritize sustainable practices and ethical sourcing, ensuring our impact on the planet remains minimal.'
                        },
                        {
                            title: 'Timeless Design',
                            description: 'Our designs bridge the gap between contemporary trends and enduring style, creating lasting value.'
                        }
                    ].map((value) => (
                        <motion.div
                            key={value.title}
                            whileHover={{ y: -10 }}
                            className="bg-white p-8 rounded-lg shadow-sm"
                        >
                            <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                            <p className="text-gray-600">{value.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>

      {/* Team Section */}
      {/*<section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((member) => (
            <motion.div
              key={member}
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <div className="mb-4 relative overflow-hidden rounded-lg aspect-square">
                <img
                  src={`https://images.unsplash.com/photo-${
                    member === 1 ? '1438761681033-6461ffad8d80' :
                    member === 2 ? '1472099645785-5658abf4ff4e' :
                    member === 3 ? '1494790108377-be9c29b29330' :
                    '1507003211169-0a1dd7228f2d'
                  }?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`}
                  alt="Team member"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold">Team Member {member}</h3>
              <p className="text-gray-600">Position</p>
            </motion.div>
          ))}
        </div>
      </section>*/}
    </div>
  );
}