import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import eliestarter from '../main/realeliestarter.png';
import { useState } from 'react';
import elie from '../main/realeliestarter.png';


const Navmockup = () => {

    const [menuOpen, setMenuOpen] = useState(false);
    const [x, setX] = useState(0)
    const [y, setY] = useState(0)
    const [rotate, setRotate] = useState(0)

    return (
        <>
        
        <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative z-50 flex items-center justify-between py-7 px-5 md:px-12"
        >
            <div className="logo">
                <Link to="/">
                <img src={elie} alt="Logo" width={300} />
                </Link>
            </div>

            <ul className="hidden md:flex font-playfair list-none gap-8 text-4xl text-white">
                <li><Link to="/projets-web">Projets web</Link></li>
                <li><Link to="/photoshop">Photoshop</Link></li>
                <li>Persona</li>
                <li><Link to="/mockup">Mockups</Link></li>
            </ul>

            <div>

            </div>
            <div>

            </div>

            <div className="md:hidden">
                <button onClick={() => setMenuOpen(true)} className="text-2xl text-blue-400">
                <i className="fas fa-bars"></i>
                </button>
            </div>
        </motion.div>


      {/* Mobile Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-3/4 bg-[#011627] shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>
        {/* Close Icon */}
        <div className="flex justify-end p-5">
          <button onClick={() => setMenuOpen(false)} className="text-2xl text-[#21c7a8]">
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Mobile Links */}
        <ul className="flex flex-col items-start px-8 gap-6 text-xl text-[#21c7a8]">
          <li><i className="fas fa-laptop-code mr-2"></i><Link to="/projets-web">Projets web</Link></li>
          <li><i className="fas fa-image mr-2"></i><Link to="/photoshop">Photoshop</Link></li>
          <li><i className="fas fa-user mr-2"></i>Persona</li>
        </ul>

        {/* Social & Logo */}
        <div className="absolute bottom-5 left-0 w-full flex flex-col items-center gap-7 text-[#21c7a8] text-2xl">
          <Link to="/">
            <img src={eliestarter} alt="Logo" width={300} />
          </Link>
          <div className="flex gap-6">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-40" onClick={() => setMenuOpen(false)} />
      )}
        
        </>
    )
}

export default Navmockup;