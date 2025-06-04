import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../estilos/Pets.css';
import { FaPlus } from 'react-icons/fa';

function MeusPets() {
    const navigate = useNavigate();
    const [pets, setPets] = useState([
        { id: 1, nome: "Rex", status: "Disponível para adoção" },
        { id: 2, nome: "Luna", status: "Em processo de adoção" },
        { id: 3, nome: "Thor", status: "Disponível para adoção" }
    ]);

    const handleAddPet = () => {
        navigate('/CadastroPet');
    };
    const PerfilPet = () => {
        navigate('/PerfilPet');
    };

    const getStatusColor = (status) => {
        return status === "Disponível para adoção" ? "#4CAF50" : "#FF9800";
    };

    return (
        <div className="meus-pets-container">
            <div className="meus-pets-header">
                <h1>MEUS PETS</h1>
            </div>

            <div className="pets-list">
                {pets.map(pet => (
                    <div key={pet.id} className="pet-card"  onClick={PerfilPet}>
                        <div className="pet-info">
                            <h2 className="pet-name">{pet.nome}</h2>
                            <div className="pet-status">
                                <span 
                                    className="status-indicator" 
                                    style={{ backgroundColor: getStatusColor(pet.status) }}
                                ></span>
                                <span>{pet.status}</span>
                            </div>
                        </div>
                    </div>
                ))}
                
                {/* Botão como último item da lista */}
                <div className="pet-card add-pet-card" onClick={handleAddPet}>
                    <div className="add-pet-content">
                        <FaPlus className="plus-icon" />
                        <span>Adicionar novo pet</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MeusPets;