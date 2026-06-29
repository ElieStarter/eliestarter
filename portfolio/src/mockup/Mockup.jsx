import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import eliestarter from '../main/realeliestarter.png';
import bg from './bg.jpg';
import Navmockup from './Navmockup';
import Design from './Design';

const Mockup = () => {

    return (

        <>

        <div className="relative h-screen w-full bg-cover bg-center" style={{ backgroundImage: `url(${bg})` }}>

            <Navmockup />
            
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white text-center px-4">
                <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                >
                <h1
                    className="text-6xl md:text-7xl font-playfair font-bold bg-clip-text text-transparent"
                    style={{
                        backgroundImage:
                        'linear-gradient(90deg, #EEF4E1 0%, #80B1A7 20%, #FAFCFE 40%, #FAE4FF 60%, #F0F8F6 80%, #EEF4E1 100%)'
                    }}
                    >
                    Mockup Universe
                </h1>
                <p className="mt-4 text-lg md:text-xl font-playfair">
                    Découvrez une nouvelle façon de voir le Monde
                </p>
                </motion.div>
                <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="mt-8 px-8 py-3 bg-gradient-to-r from-green-200 via-white to-pink-200 text-black rounded-full shadow-md font-playfair text-lg"
                >
                    Explore
                </motion.button>
            </div>
        </div>

        <Design />
        
        </>
    )
}


export default Mockup;