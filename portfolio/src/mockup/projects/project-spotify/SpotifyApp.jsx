import React, { useState } from 'react';
import logo from './spotify.png';

// Identifiants Spotify
const CLIENT_ID = '4395ebb62cc04b4d8411b169a23920c6';
const CLIENT_SECRET = '145870b926ea4b73ad5ef3435843babc';

const SpotifyApp = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [artists, setArtists] = useState([]);
  const [token, setToken] = useState('');
  const [searchQueryAlbum, setSearchQueryAlbum] = useState('');
  const [albums, setAlbums] = useState([]);
  const [loadingArtist, setLoadingArtist] = useState(false);
  const [loadingAlbum, setLoadingAlbum] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Récupération du token
  const getToken = async () => {
    try {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET),
        },
        body: 'grant_type=client_credentials',
      });
      if (!response.ok) throw new Error('Erreur token');
      const data = await response.json();
      setToken(data.access_token);
      return data.access_token;
    } catch (error) {
      console.error('Erreur lors de la récupération du token', error);
      alert('Impossible d\'obtenir un token Spotify. Vérifiez vos identifiants.');
      return null;
    }
  };

  // Recherche d'artistes
  const searchArtists = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setLoadingArtist(true);
    setArtists([]);

    let currentToken = token;
    if (!currentToken) {
      currentToken = await getToken();
      if (!currentToken) {
        setLoadingArtist(false);
        return;
      }
    }

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchQuery)}&type=artist&limit=20`,
        { headers: { Authorization: `Bearer ${currentToken}` } }
      );
      if (!response.ok) throw new Error('Erreur API');
      const data = await response.json();
      if (data.artists && data.artists.items) {
        setArtists(data.artists.items);
      } else {
        setArtists([]);
      }
    } catch (error) {
      console.error('Erreur recherche artistes', error);
      alert('Erreur lors de la recherche des artistes');
    } finally {
      setLoadingArtist(false);
    }
  };

  // Recherche d'albums
  const searchAlbums = async (e) => {
    e.preventDefault();
    if (!searchQueryAlbum.trim()) return;
    setLoadingAlbum(true);
    setAlbums([]);

    let currentToken = token;
    if (!currentToken) {
      currentToken = await getToken();
      if (!currentToken) {
        setLoadingAlbum(false);
        return;
      }
    }

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchQueryAlbum)}&type=album&limit=20`,
        { headers: { Authorization: `Bearer ${currentToken}` } }
      );
      if (!response.ok) throw new Error('Erreur API');
      const data = await response.json();
      if (data.albums && data.albums.items) {
        setAlbums(data.albums.items);
      } else {
        setAlbums([]);
      }
    } catch (error) {
      console.error('Erreur recherche albums', error);
      alert('Erreur lors de la recherche des albums');
    } finally {
      setLoadingAlbum(false);
    }
  };

  // Fermeture de la sidebar lors du clic sur un lien (mobile)
  const closeSidebar = () => {
    if (window.innerWidth < 768) setIsSidebarOpen(false);
  };

  return (
    <div className="flex min-h-screen relative">
      {/* Overlay pour mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed md:static top-0 left-0 h-full bg-black p-4 w-64 z-50
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:w-64 flex-shrink-0 overflow-y-auto
        `}
      >
        <div className="flex justify-between items-center mb-6">
          <img src={logo} alt="Logo" width="130" />
          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setIsSidebarOpen(false)}
          >
            ✕
          </button>
        </div>

        <ul className="space-y-2">
          <li className="text-white p-2 hover:bg-gray-400 rounded-2xl transition duration-200 cursor-pointer" onClick={closeSidebar}>
            <i className="fa-solid fa-house mr-2"></i> Accueil
          </li>
          <li className="text-white p-2 hover:bg-gray-400 rounded-2xl transition duration-200 cursor-pointer" onClick={closeSidebar}>
            <i className="fa-brands fa-google-play mr-2"></i> Playlist
          </li>
          <li className="text-white p-2 hover:bg-gray-400 rounded-2xl transition duration-200 cursor-pointer" onClick={closeSidebar}>
            <i className="fa-solid fa-book-open mr-2"></i> Bibliothèque
          </li>
        </ul>

        <ul className="mt-6 space-y-2">
          <li className="text-white p-2 hover:bg-gray-400 rounded-2xl transition duration-200 cursor-pointer" onClick={closeSidebar}>
            <i className="fa-solid fa-plus mr-2"></i> Créer une playlist
          </li>
          <li className="text-white p-2 hover:bg-gray-400 rounded-2xl transition duration-200 cursor-pointer" onClick={closeSidebar}>
            <i className="fa-solid fa-heart mr-2"></i> Titres likés
          </li>
        </ul>

        <ul className="mt-6 space-y-2">
          <li className="text-white p-2 hover:bg-gray-400 rounded-2xl transition duration-200 cursor-pointer" onClick={closeSidebar}>Sélection</li>
          <li className="text-white p-2 hover:bg-gray-400 rounded-2xl transition duration-200 cursor-pointer" onClick={closeSidebar}>Découverte de la semaine</li>
          <li className="text-white p-2 hover:bg-gray-400 rounded-2xl transition duration-200 cursor-pointer" onClick={closeSidebar}>Radar des sorties</li>
          <li className="text-white p-2 hover:bg-gray-400 rounded-2xl transition duration-200 cursor-pointer" onClick={closeSidebar}>Playlists</li>
          <li className="text-white p-2 hover:bg-gray-400 rounded-2xl transition duration-200 cursor-pointer" onClick={closeSidebar}>Mes titres shazam</li>
          <li className="text-white p-2 hover:bg-gray-400 rounded-2xl transition duration-200 cursor-pointer" onClick={closeSidebar}>2021</li>
          <li className="text-white p-2 hover:bg-gray-400 rounded-2xl transition duration-200 cursor-pointer" onClick={closeSidebar}>2020</li>
          <li className="text-white p-2 hover:bg-gray-400 rounded-2xl transition duration-200 cursor-pointer" onClick={closeSidebar}>2019</li>
        </ul>
      </div>

      {/* Contenu principal */}
      <div className="flex-1 bg-gradient-to-b from-black via-gray-500 to-black text-white min-h-screen">
        {/* Navbar avec hamburger */}
        <div className="flex justify-between items-center bg-black p-4 md:p-5">
          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setIsSidebarOpen(true)}
          >
            ☰
          </button>
          <div className="flex gap-2 ml-auto">
            <button className="px-4 py-2 md:px-6 md:py-2 rounded-full border border-white hover:bg-black hover:text-white hover:border-black transition duration-300 text-sm md:text-base">
              Se connecter
            </button>
            <button className="px-4 py-2 md:px-6 md:py-2 rounded-full bg-black text-white border border-black hover:bg-gray-800 transition duration-300 text-sm md:text-base">
              S'inscrire
            </button>
          </div>
        </div>

        {/* Section recherche artistes */}
        <div className="p-4 md:p-5">
          <h1 className="text-xl md:text-2xl font-bold mb-4">Recherche d'artistes</h1>
          <form onSubmit={searchArtists} className="flex flex-col sm:flex-row flex-wrap items-stretch gap-3">
            <input
              type="text"
              placeholder="Rechercher un artiste..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 min-w-[200px] p-2 rounded border border-white bg-transparent text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-black text-white rounded-lg hover:scale-105 transition duration-200 disabled:opacity-50 whitespace-nowrap"
              disabled={loadingArtist}
            >
              {loadingArtist ? 'Chargement...' : 'Rechercher'}
            </button>
          </form>

          <div className="mt-6">
            {loadingArtist && <p className="text-gray-300">Recherche en cours...</p>}
            {!loadingArtist && artists.length > 0 && (
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {artists.map((artist) => (
                  <li key={artist.id} className="bg-black/30 p-4 rounded-lg backdrop-blur-sm hover:bg-black/50 transition">
                    <h2 className="text-lg md:text-xl font-semibold">{artist.name}</h2>
                    <p className="text-sm md:text-base">Popularité : {artist.popularity}</p>
                    {artist.images.length > 0 && (
                      <img
                        src={artist.images[0].url}
                        alt={artist.name}
                        width={100}
                        className="rounded-lg mt-2 mx-auto"
                      />
                    )}
                  </li>
                ))}
              </ul>
            )}
            {!loadingArtist && artists.length === 0 && searchQuery && (
              <p className="text-gray-300">Aucun artiste trouvé pour "{searchQuery}"</p>
            )}
          </div>
        </div>

        {/* Section recherche albums */}
        <div className="p-4 md:p-5">
          <h1 className="text-xl md:text-2xl font-bold mb-4">Rechercher un album</h1>
          <form onSubmit={searchAlbums} className="flex flex-col sm:flex-row flex-wrap items-stretch gap-3">
            <input
              type="text"
              placeholder="Rechercher un album..."
              value={searchQueryAlbum}
              onChange={(e) => setSearchQueryAlbum(e.target.value)}
              className="flex-1 min-w-[200px] p-2 rounded border border-white bg-transparent text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-black text-white rounded-lg hover:scale-105 transition duration-200 disabled:opacity-50 whitespace-nowrap"
              disabled={loadingAlbum}
            >
              {loadingAlbum ? 'Chargement...' : 'Rechercher'}
            </button>
          </form>

          <div className="mt-6">
            {loadingAlbum && <p className="text-gray-300">Recherche en cours...</p>}
            {!loadingAlbum && albums.length > 0 && (
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {albums.map((album) => (
                  <li key={album.id} className="bg-black/30 p-4 rounded-lg backdrop-blur-sm hover:bg-black/50 transition">
                    <h2 className="text-lg md:text-xl font-semibold">{album.name}</h2>
                    <p className="text-sm md:text-base">
                      Artiste(s) : {album.artists.map((artist) => artist.name).join(', ')}
                    </p>
                    {album.images.length > 0 && (
                      <img
                        src={album.images[0].url}
                        alt={album.name}
                        width={100}
                        className="rounded-lg mt-2 mx-auto"
                      />
                    )}
                  </li>
                ))}
              </ul>
            )}
            {!loadingAlbum && albums.length === 0 && searchQueryAlbum && (
              <p className="text-gray-300">Aucun album trouvé pour "{searchQueryAlbum}"</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpotifyApp;