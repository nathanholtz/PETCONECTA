import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../estilos/Matches.css';
import { FaComment, FaHeart } from 'react-icons/fa';

function Matches() {
    const navigate = useNavigate();
    
    // Dados de exemplo baseados na imagem
    const matches = [
        {
            id: 1,
            nome: "NOME",
            status: "Sexer, MP",
            info: "Mestre DIVIDO",
            extra: "Inspirato",
            pet: "Nome de Ponsetier",
            foto: "user1.jpg"
        },
        {
            id: 2,
            nome: "Egaleche:",
            status: "Companiaio",
            info: "Casternese",
            pet: "Cortina",
            foto: "user2.jpg"
        },
        {
            id: 3,
            nome: "Diademega",
            status: "Disponível",
            info: "Ativo recentemente",
            pet: "Rex",
            foto: "user3.jpg"
        },
        {
            id: 4,
            nome: "Fulano",
            status: "Online",
            info: "Interessado em adoção",
            pet: "Luna",
            foto: "user4.jpg"
        }
    ];

    const openChat = (matchId) => {
        navigate(`/chat/${matchId}`);
    };

    return (
        <div className="matches-container">
            <div className="matches-header">
                <h1>MATCHES</h1>
            </div>

            <div className="matches-list">
                {matches.map(match => (
                    <div key={match.id} className="match-card">
                        <div className="match-photo">
                            <div className="avatar-placeholder">
                                {match.nome.charAt(0)}
                            </div>
                        </div>
                        
                        <div className="match-info">
                            <div className="match-header">
                                <h2 className="match-name">{match.nome}</h2>
                                <span className="match-status">{match.status}</span>
                            </div>
                            
                            <div className="match-details">
                                <p>{match.info}</p>
                                <p>{match.extra}</p>
                            </div>
                            
                            <div className="match-pet">
                                <FaHeart className="heart-icon" />
                                <span>{match.pet}</span>
                            </div>
                        </div>
                        
                        <button 
                            className="chat-button"
                            onClick={() => openChat(match.id)}
                        >
                            <FaComment className="comment-icon" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Matches;