import React, { useEffect, useState } from "react";
import Navbar from "../main/Navbar";
import peter from "./peter 1 nobackground.png";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../main/Footer";
import logo from "./pngwing.com.png";

const API_URL = "http://localhost:1337";

const Photo = () => {
  const [photos, setPhotos] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const res = await fetch(`${API_URL}/api/photos?populate=*`);
        const data = await res.json();

        if (Array.isArray(data?.data)) {
          setPhotos(data.data);
        }
      } catch (error) {
        console.error("Erreur de chargement :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  useEffect(() => {
    if (photos.length <= 1) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % photos.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [photos]);

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % photos.length);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#07111f] text-white">
        <Navbar />
        <div className="flex min-h-[70vh] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-5 h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-[#21c7a8]" />
            <p className="text-lg text-white/80">Chargement des créations...</p>
          </div>
        </div>
      </div>
    );
  }

  if (photos.length === 0) {
    return (
      <div className="min-h-screen bg-[#07111f] text-white">
        <Navbar />
        <div className="flex min-h-[70vh] items-center justify-center px-6 text-center">
          <p className="rounded-xl border border-white/10 bg-white/5 px-6 py-4 text-lg text-red-300">
            Aucune photo disponible pour le moment.
          </p>
        </div>
      </div>
    );
  }

  const current = photos[index];
  const title = current?.Title || "Sans titre";
  const imageUrl = current?.photoshop?.[0]?.url;
  const fullImage = imageUrl ? `${API_URL}${imageUrl}` : null;

  return (
    <motion.div
      className="min-h-screen bg-[#07111f] text-white"
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -80 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <Navbar />

      <main>
        <section className="relative overflow-hidden px-6 py-16 sm:px-12 lg:px-24">
          <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1fr_0.85fr]">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#21c7a8]">
                Galerie créative
              </p>

              <h1 className="libre max-w-4xl text-5xl font-black italic leading-none sm:text-7xl lg:text-8xl">
                Photoshop
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
                Une sélection de retouches photo, compositions visuelles et créations graphiques réalisées avec Adobe Photoshop.
              </p>
            </div>

            <div className="flex justify-center lg:justify-end">
              <img
                src={peter}
                alt=""
                className="w-full max-w-md object-contain drop-shadow-2xl lg:max-w-xl"
              />
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-white/[0.04] px-6 py-10 sm:px-12 lg:px-24">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 md:flex-row">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#21c7a8]">
                Retouche photo
              </p>
              <h2 className="max-w-2xl text-3xl font-bold leading-tight text-white sm:text-4xl">
                Découvrez mes créations réalisées avec Adobe Photoshop
              </h2>
            </div>

            <img
              src={logo}
              alt="Adobe Photoshop"
              className="w-36 object-contain sm:w-44 md:w-56"
            />
          </div>
        </section>

        <section className="px-4 py-10 sm:px-8 lg:px-16">
          <div className="relative mx-auto h-[75vh] max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 bg-black shadow-2xl">
            <AnimatePresence mode="wait">
              {fullImage && (
                <motion.img
                  key={index}
                  src={fullImage}
                  alt={title}
                  className="absolute inset-0 h-full w-full object-cover"
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.75, ease: "easeOut" }}
                />
              )}
            </AnimatePresence>

            <div className="absolute inset-0 bg-black/45" />

            <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-8 lg:p-10">
              <div className="max-w-2xl rounded-2xl border border-white/15 bg-[#07111f]/75 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#21c7a8]">
                  Projet {index + 1} / {photos.length}
                </p>

                <h2 className="mb-6 text-3xl font-black leading-tight text-white sm:text-5xl">
                  {title}
                </h2>

                {fullImage && (
                  <a
                    href={fullImage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-[#21c7a8] px-6 py-3 text-base font-bold text-[#07111f] transition hover:bg-white"
                  >
                    Voir l'image
                  </a>
                )}
              </div>
            </div>

            {photos.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  aria-label="Photo précédente"
                  className="absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/15 text-3xl text-white backdrop-blur-md transition hover:bg-white hover:text-[#07111f] sm:left-6"
                >
                  ‹
                </button>

                <button
                  onClick={nextSlide}
                  aria-label="Photo suivante"
                  className="absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/15 text-3xl text-white backdrop-blur-md transition hover:bg-white hover:text-[#07111f] sm:right-6"
                >
                  ›
                </button>

                <div className="absolute left-1/2 top-6 z-20 flex -translate-x-1/2 gap-2">
                  {photos.map((_, photoIndex) => (
                    <button
                      key={photoIndex}
                      onClick={() => setIndex(photoIndex)}
                      aria-label={`Aller à la photo ${photoIndex + 1}`}
                      className={`h-2.5 rounded-full transition-all ${
                        photoIndex === index
                          ? "w-8 bg-[#21c7a8]"
                          : "w-2.5 bg-white/50 hover:bg-white"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </motion.div>
  );
};

export default Photo;




















































// import React, { useEffect, useState } from "react";
// import Navbar from "../main/Navbar";
// import peter from "./peter 1 nobackground.png";
// import { motion, AnimatePresence } from "framer-motion";
// import Footer from "../main/Footer";
// import logo from './pngwing.com.png';

// const Photo = () => {
//   const [photos, setPhotos] = useState([]);
//   const [index, setIndex] = useState(0);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchPhotos = async () => {
//       try {
//         const res = await fetch("http://localhost:1337/api/photos?populate=*");
//         const data = await res.json();
//         if (Array.isArray(data?.data)) {
//           setPhotos(data.data);
//         }
//       } catch (error) {
//         console.error("❌ Erreur de chargement :", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPhotos();
//   }, []);

//   useEffect(() => {
//     if (photos.length === 0) return;
//     const timer = setInterval(() => {
//       setIndex((prev) => (prev + 1) % photos.length);
//     }, 5000);
//     return () => clearInterval(timer);
//   }, [photos]);

//   const prevSlide = () => setIndex((prev) => (prev - 1 + photos.length) % photos.length);
//   const nextSlide = () => setIndex((prev) => (prev + 1) % photos.length);

//   if (loading) return <p className="text-center text-white">Chargement...</p>;
//   if (photos.length === 0) return <p className="text-center text-red-500">Aucune photo disponible.</p>;

//   const current = photos[index];
//   const title = current?.Title || "Sans titre";
//   const imageUrl = current?.photoshop?.[0]?.url;
//   const fullImage = imageUrl ? `http://localhost:1337${imageUrl}` : null;
// //   syntaxe pour l hebergement :
// // const fullImage = `https://api.monsite.com${url}`

//   return (
//     <>

//     <motion.div
//         initial={{ opacity: 0, x: 100 }}
//         animate={{ opacity: 1, x: 0 }}
//         exit={{ opacity: 0, x: -100 }}
//         transition={{ duration: 0.4, ease: "easeOut" }}
//     >
//       <Navbar />


//       <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-12 py-12 px-6 sm:px-52">
//         <h1 className="text-4xl sm:text-6xl lg:text-9xl text-white font-bold italic libre">Photoshop</h1>
//         <img src= {peter} alt="" width={777} />
//       </div>

//         <section className="bg-gray-300 p-14">
//           <div className="md:flex items-center justify-around">
//             <div className="max-w-xl">
//               <h1 className="text-4xl italic">Découvrez mes retouches photo by adobe photoshop ci-dessous 👇</h1>
//             </div>
//             <img src= {logo} alt="" width={280} />
//           </div>
//         </section>

//       <div className="relative w-full h-screen overflow-hidden">
//         <AnimatePresence mode="wait">
//           <motion.img
//             key={index}
//             src={fullImage}
//             initial={{ opacity: 0, scale: 1.1 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.95 }}
//             transition={{ duration: 0.8 }}
//             alt={title}
//             className="absolute top-0 left-0 w-full h-full object-cover"
//           />
//         </AnimatePresence>

//         <div className="absolute top-1/2 left-10 transform -translate-y-1/2 text-white z-10">
//         <div className="p-12 md:mx-12 bg-[#011627]/70 backdrop-blur-md rounded-lg max-w-full overflow-hidden">
//             <h2 className="text-4xl sm:text-4xl font-bold mb-6 drop-shadow-lg whitespace-nowrap overflow-hidden text-ellipsis">
//                 {title}
//             </h2>
//             {fullImage && (
//                 <a
//                 href={fullImage}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-block px-6 py-3 bg-[#21c7a8] text-white rounded-lg text-lg font-semibold hover:bg-[#1aa08c] transition"
//                 >
//                 Voir l'image
//                 </a>
//             )}
//         </div>
//         </div>

//         <button
//           onClick={prevSlide}
//           className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/70 text-black p-3 rounded-full hover:bg-white shadow"
//         >
//           <i className="fas fa-chevron-left" />
//         </button>
//         <button
//           onClick={nextSlide}
//           className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/70 text-black p-3 rounded-full hover:bg-white shadow"
//         >
//           <i className="fas fa-chevron-right" />
//         </button>
        
//         {/* permet de faire un mode sombre sur l'image */}
//         <div className="absolute inset-0 bg-black bg-opacity-40 z-0" />
//       </div>

//       <Footer />
//       </motion.div>
//     </>
//   );
// };

// export default Photo;
