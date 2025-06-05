import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { GrConfigure } from 'react-icons/gr';
import { CiMap, CiHeart} from "react-icons/ci";
import { FaHome, FaPaw } from "react-icons/fa";

function Layout() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className="app-container">
            {/* Conteúdo das páginas */}
            <div className="content">
                <Outlet />
            </div>
            
            {/* Barra de navegação fixa (aparece em todas as páginas) */}
            <div className="bottom-nav">
                <button 
                    className={`nav-button ${location.pathname === '/' ? 'active' : ''}`}
                    onClick={() => navigate('/')} 
                >
                   <FaHome />
                </button>
                  <button 
                    className="nav-button"
                    onClick={() => navigate('/')} 
                >
                     <CiMap />
                </button>
                <button 
                    className={`nav-button ${location.pathname === '/pets' ? 'active' : ''}`}
                    onClick={() => navigate('/pets')} 
                >
                  <FaPaw /> 
                </button>
                 <button 
                     className={`nav-button ${location.pathname === '/matches' ? 'active' : ''}`}
                    onClick={() => navigate('/matches')} 
                >
                  <CiHeart /> 
                </button>
                <button 
                     className={`nav-button ${location.pathname === '/config' ? 'active' : ''}`}
                    onClick={() => navigate('/config')} 
                >
                   <GrConfigure />
                </button>
            </div>
        </div>
    );
}

export default Layout;