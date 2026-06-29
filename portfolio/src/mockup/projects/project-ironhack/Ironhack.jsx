import React from "react";

const Ironhack = () => {
  return (
    <>
      {/* Navbar principale */}
      <nav className="flex flex-wrap justify-around items-center p-4 bg-gradient-to-r from-[#7575f7] to-[#00d4ff]">
        <img src="pngwing.com (6).png" alt="logo" width="100" />
        <div className="flex items-center gap-2">
          <span className="text-2xl">
            <i className="fa-solid fa-globe"></i> FR
          </span>
          <button className="px-4 py-2 rounded-lg text-base bg-white hover:bg-gray-100 transition">
            En savoir plus
          </button>
        </div>
      </nav>

      {/* Liste de navigation */}
      <ul className="flex flex-wrap justify-center items-center gap-5 md:gap-12 text-white text-xl bg-gradient-to-r from-[#6767e6] to-[#00d4ff] shadow-lg px-4 py-3 md:px-20 lg:px-40 xl:px-60">
        <li>Formation</li>
        <li>Alternance</li>
        <li>Étudier</li>
        <li>Financement</li>
        <li>Ressource</li>
        <li>Blog</li>
      </ul>

      {/* Section hero */}
      <section className="flex flex-col items-center gap-4 text-white px-4 py-16 md:py-24 bg-gradient-to-r from-[#7575f7] to-[#00d4ff]">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center max-w-4xl">
          Votre futur dans la tech commence ici
        </h1>
        <span className="text-center max-w-3xl text-lg">
          Formations intensives en développement Web, UX/UI design, Data
          analyse, Cybersécurité, Machine Learning, AI et DevOps. Formez-vous
          aux métiers de demain et rejoignez une communauté Tech internationale.
        </span>

        <div className="flex flex-col md:flex-row items-center gap-4 bg-white rounded-3xl p-6 max-w-4xl w-full mt-6">
          <input
            type="text"
            placeholder="Que veux-tu apprendre ?"
            className="w-full md:w-1/2 p-3 border border-black rounded-lg"
          />
          <input
            type="text"
            placeholder="Où veux-tu apprendre ?"
            className="w-full md:w-1/2 p-3 border border-black rounded-lg"
          />
          <button className="w-full md:w-auto px-6 py-3 bg-gray-400/50 text-white rounded-full hover:bg-gray-500/50 transition">
            Trouvez votre formation
          </button>
        </div>
      </section>

      {/* Corps principal */}
      <section className="p-6 md:p-12">
        <div className="flex flex-col gap-3 text-center max-w-4xl mx-auto text-white">
          <h2 className="text-3xl md:text-4xl font-bold">
            Lancez votre carrière tech avec notre formation !
          </h2>
          <span className="text-lg">
            Apprenez les compétences demandées et offrez-vous de nouvelles
            opportunités de carrière grâce à nos formations qui prennent en
            compte les besoins actuels des entreprises.
          </span>
        </div>

        {/* Première rangée de cartes (avec dégradés) */}
        <div className="flex flex-wrap justify-center gap-6 py-10">
          {/* Carte 1 */}
          <div className="max-w-sm p-6 rounded-3xl text-white bg-gradient-to-br from-[#0047ff] via-[#b93a3a] to-[#ff00ce] hover:-translate-y-1 transition-transform duration-300">
            <div className="flex flex-col gap-3">
              <h3 className="text-2xl font-bold">Marketing digital</h3>
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
                quidem, cupiditate officiis odio quasi aut laudantium hic nam
                repellat provident nulla asperiores iure in cum saepe dolorum
                illo. Praesentium, maiores.
              </span>
              <button className="self-start px-4 py-2 bg-white text-[#ff05ff] rounded-full border border-[#ff05ff] hover:bg-gray-100 transition">
                Découvrir la formation
              </button>
            </div>
          </div>

          {/* Carte 2 */}
          <div className="max-w-sm p-6 rounded-3xl text-white bg-gradient-to-br from-[#00ff8d] to-[#1000ff] hover:-translate-y-1 transition-transform duration-300">
            <div className="flex flex-col gap-3">
              <h3 className="text-2xl font-bold">Marketing digital</h3>
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
                quidem, cupiditate officiis odio quasi aut laudantium hic nam
                repellat provident nulla asperiores iure in cum saepe dolorum
                illo. Praesentium, maiores.
              </span>
              <button className="self-start px-4 py-2 bg-white text-[#ff05ff] rounded-full border border-[#ff05ff] hover:bg-gray-100 transition">
                Découvrir la formation
              </button>
            </div>
          </div>

          {/* Carte 3 */}
          <div className="max-w-sm p-6 rounded-3xl text-white bg-gradient-to-br from-[#b02fde] via-[#8747f6] via-[#6970f1] to-[#00ffde] hover:-translate-y-1 transition-transform duration-300">
            <div className="flex flex-col gap-3">
              <h3 className="text-2xl font-bold">Marketing digital</h3>
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
                quidem, cupiditate officiis odio quasi aut laudantium hic nam
                repellat provident nulla asperiores iure in cum saepe dolorum
                illo. Praesentium, maiores.
              </span>
              <button className="self-start px-4 py-2 bg-white text-[#ff05ff] rounded-full border border-[#ff05ff] hover:bg-gray-100 transition">
                Découvrir la formation
              </button>
            </div>
          </div>

          {/* Carte 4 */}
          <div className="max-w-sm p-6 rounded-3xl text-white bg-gradient-to-br from-[#ff1a58] via-[#6970f1] via-[#528fed] to-[#00ffde] hover:-translate-y-1 transition-transform duration-300">
            <div className="flex flex-col gap-3">
              <h3 className="text-2xl font-bold">Marketing digital</h3>
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
                quidem, cupiditate officiis odio quasi aut laudantium hic nam
                repellat provident nulla asperiores iure in cum saepe dolorum
                illo. Praesentium, maiores.
              </span>
              <button className="self-start px-4 py-2 bg-white text-[#ff05ff] rounded-full border border-[#ff05ff] hover:bg-gray-100 transition">
                Découvrir la formation
              </button>
            </div>
          </div>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-center my-8 text-white">
          Découvrez les autres formations qui peuvent vous aider à changer de
          carrière :
        </h2>

        {/* Deuxième rangée de cartes (simples) */}
        <div className="flex flex-wrap justify-center gap-6">
          {/* Carte 1 */}
          <div className="max-w-sm p-6 rounded-2xl shadow-md border border-white bg-white text-black flex flex-col gap-3 hover:-translate-y-1 transition-transform duration-300">
            <i className="fa-solid fa-users-rectangle text-4xl"></i>
            <div className="flex flex-col gap-2">
              <h4 className="text-2xl font-extrabold text-gray-600">
                Développement Web
              </h4>
              <span>
                Devenez développeur Full Stack et apprenez à créer vos propres
                applications web avec HTML5, CSS, JS, et plus encore !
              </span>
              <button className="self-start px-4 py-2 bg-white text-[#ff05ff] rounded-full border border-[#ff05ff] hover:bg-gray-100 transition">
                Découvrir la formation
              </button>
            </div>
          </div>

          {/* Carte 2 */}
          <div className="max-w-sm p-6 rounded-2xl shadow-md border border-white bg-white text-black flex flex-col gap-3 hover:-translate-y-1 transition-transform duration-300">
            <i className="fa-solid fa-users-rectangle text-4xl"></i>
            <div className="flex flex-col gap-2">
              <h4 className="text-2xl font-extrabold text-gray-600">
                Data analyse
              </h4>
              <span>
                Développez vos compétences existantes avec l'IA. Apprenez les
                outils et compétences les plus demandées dans ce secteur en
                pleine croissance.
              </span>
              <button className="self-start px-4 py-2 bg-white text-[#ff05ff] rounded-full border border-[#ff05ff] hover:bg-gray-100 transition">
                Découvrir la formation
              </button>
            </div>
          </div>

          {/* Carte 3 */}
          <div className="max-w-sm p-6 rounded-2xl shadow-md border border-white bg-white text-black flex flex-col gap-3 hover:-translate-y-1 transition-transform duration-300">
            <i className="fa-solid fa-users-rectangle text-4xl"></i>
            <div className="flex flex-col gap-2">
              <h4 className="text-2xl font-extrabold text-gray-600">
                UI/UX Design
              </h4>
              <span>
                Apprends la compétence la plus polyvalente de la technologie et
                décroche un emploi dans n'importe quel domaine de ton choix.
                Sport, FinTech, mode, voyage... les possibilités sont infinies !
              </span>
              <button className="self-start px-4 py-2 bg-white text-[#ff05ff] rounded-full border border-[#ff05ff] hover:bg-gray-100 transition">
                Découvrir la formation
              </button>
            </div>
          </div>

          {/* Carte 4 */}
          <div className="max-w-sm p-6 rounded-2xl shadow-md border border-white bg-white text-black flex flex-col gap-3 hover:-translate-y-1 transition-transform duration-300">
            <i className="fa-solid fa-users-rectangle text-4xl"></i>
            <div className="flex flex-col gap-2">
              <h4 className="text-2xl font-extrabold text-gray-600">
                Cybersécurité
              </h4>
              <span>
                Relève le défi et rejoins la révolution DevOps. Réponds à la
                demande croissante de professionnels DevOps et Cloud, et deviens
                un candidat de premier plan.
              </span>
              <button className="self-start px-4 py-2 bg-white text-[#ff05ff] rounded-full border border-[#ff05ff] hover:bg-gray-100 transition">
                Découvrir la formation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section actualités */}
      <div className="flex flex-col items-center p-8 bg-gray-200/50">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          Nos dernières actualités
        </h1>
        <div className="flex flex-wrap justify-center gap-4 text-xl">
          <div className="bg-white p-4 rounded-lg shadow-md max-w-sm">
            <h6 className="text-purple-700 font-bold">Formations</h6>
            <h5 className="font-semibold">Alternance</h5>
            <span className="text-base block mt-1">
              En savoir plus sur nos formations en alternance
            </span>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md max-w-sm">
            <h6 className="text-purple-700 font-bold">Formations</h6>
            <h5 className="font-semibold">Alternance</h5>
            <span className="text-base block mt-1">
              En savoir plus sur nos formations en alternance
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Ironhack;