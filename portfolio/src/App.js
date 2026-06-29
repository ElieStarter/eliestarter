import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './main/Home';
import Web from './web-project/Web';
import Mockup from './mockup/Mockup';
import './index.css';
import Photo from './photoshop/Main';
import Illustrator from './illustrator-logo/Illustrator';

// mockups website :
import Ironhack from './mockup/projects/project-ironhack/Ironhack';
import SpotifyApp from './mockup/projects/project-spotify/SpotifyApp';

function App() {
  return (
    <Router>
      <>
      
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/projets-web" element={<Web />} />
          <Route path='/mockup' element={<Mockup />} />
          <Route path='/photoshop' element={<Photo />} />
          <Route path="/mockup/ironhack" element={<Ironhack />} />
          <Route path="/mockup/spotify" element={<SpotifyApp />} />
          <Route path="/illustrator" element={<Illustrator />} />
        </Routes>
      
      </>
    </Router>
  );
}

export default App;
