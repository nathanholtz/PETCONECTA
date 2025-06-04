import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../estilos/Config.css';
import { FaUser, FaPaw, FaHeart, FaInfoCircle, FaSignOutAlt } from 'react-icons/fa';

function Configuracoes() {
    const navigate = useNavigate();

    const menuItems = [
        { id: 1, title: "Minha Conta", icon: <FaUser />, path: "/perfil" },
        { id: 2, title: "Meus Pets", icon: <FaPaw />, path: "/pets" },
        { id: 3, title: "Meus Matches", icon: <FaHeart />, path: "/matches" },
        { id: 4, title: "Sobre Nós", icon: <FaInfoCircle />, path: "/SobreNos" },
        { id: 5, title: "Sair da Conta", icon: <FaSignOutAlt />, path: "/login" }
    ];

    const handleItemClick = (path) => {
        if (path === "/login") {
            // Lógica para logout
            console.log("Usuário deslogado");
            localStorage.removeItem('token');
        }
        navigate(path);
    };

    return (
        <div className="configuracoes-container">
            <div className="configuracoes-header">
                <h1>CONFIGURAÇÕES</h1>
            </div>

            <div className="menu-list">
                {menuItems.map(item => (
                    <div 
                        key={item.id} 
                        className="menu-item"
                        onClick={() => handleItemClick(item.path)}
                    >
                        <div className="menu-icon">{item.icon}</div>
                        <div className="menu-title">{item.title}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Configuracoes;