import React from 'react'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

/* pages */
import Home from './components/pages/Home.js';
import Login from './components/pages/Login.js';
import Layout from './components/layout/Layout.js';
import MeusPets from './components/pages/Pets.js';
import CadastroPet from './components/pages/CadastroPet.js';
import Configuracao from './components/pages/Config.js';
import Matches from './components/pages/Matches.js';
import Cadastro from './components/pages/Cadastro.js';
import Perfil from './components/pages/Perfil.js';
import PerfilPet from './components/pages/PerfilPet.js';
import SobreNos from './components/pages/SobreNos.js';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/Pets" element={<MeusPets />}/>
          <Route path="/CadastroPet" element={<CadastroPet />} />
          <Route path="/Matches" element={<Matches />} />
          <Route path="/Config" element={<Configuracao />} />
          <Route path="/Perfil" element={<Perfil />} />
          <Route path="/PerfilPet" element={<PerfilPet />} />
          <Route path="/SobreNos" element={<SobreNos />} />
          </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/Cadastro" element={<Cadastro />} />
      </Routes>
    </Router> 
  );
}

export default App;
