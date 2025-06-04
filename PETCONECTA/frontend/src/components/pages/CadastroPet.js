import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../estilos/CadastroPet.css';
import { FaPlus, FaCamera } from 'react-icons/fa';

function CadastroPet() {
    const navigate = useNavigate();
    const [petData, setPetData] = useState({
        nome: '',
        status: 'Disponível para adoção',
        idade: '',
        porte: 'M',
        genero: 'Macho',
        temperamento: '',
        cuidados: '',
        descricao: '',
        fotos: []
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPetData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const newPhoto = URL.createObjectURL(e.target.files[0]);
            setPetData(prev => ({
                ...prev,
                fotos: [...prev.fotos, newPhoto]
            }));
        }
    };
    
    const removePhoto = (index) => {
        setPetData(prev => {
            const newPhotos = [...prev.fotos];
            newPhotos.splice(index, 1);
            return { ...prev, fotos: newPhotos };
        });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Dados do pet:', petData);
        // Aqui você faria a chamada API para salvar o pet
        alert('Pet cadastrado com sucesso!');
        navigate('/meus-pets'); // Redireciona para a lista de pets
    };

    return (
        <div className="cadastro-pet-container">
            <h1 className="cadastro-pet-title">CADASTRO-PET</h1>
            
            <form onSubmit={handleSubmit} className="cadastro-pet-form">
                <div className="form-row">
                    <div className="form-group">
                        <label>Nome do Pet</label>
                        <input
                            type="text"
                            name="nome"
                            value={petData.nome}
                            onChange={handleChange}
                            required
                            placeholder="Digite o nome do pet"
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Status</label>
                        <select 
                            name="status" 
                            value={petData.status} 
                            onChange={handleChange}
                        >
                            <option value="Disponível para adoção">Disponível para adoção</option>
                            <option value="Em processo de adoção">Em processo de adoção</option>
                            <option value="Adotado">Adotado</option>
                        </select>
                    </div>
                </div>
                
                <div className="form-row">
                    <div className="form-group">
                        <label>Idade</label>
                        <input
                            type="text"
                            name="idade"
                            value={petData.idade}
                            onChange={handleChange}
                            placeholder="Ex: 2 anos"
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Porte</label>
                        <div className="radio-group">
                            <label>
                                <input
                                    type="radio"
                                    name="porte"
                                    value="P"
                                    checked={petData.porte === 'P'}
                                    onChange={handleChange}
                                />
                                P
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="porte"
                                    value="M"
                                    checked={petData.porte === 'M'}
                                    onChange={handleChange}
                                />
                                M
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="porte"
                                    value="G"
                                    checked={petData.porte === 'G'}
                                    onChange={handleChange}
                                />
                                G
                            </label>
                        </div>
                    </div>
                </div>
                
                <div className="form-row">
                    <div className="form-group">
                        <label>Gênero</label>
                        <div className="radio-group">
                            <label>
                                <input
                                    type="radio"
                                    name="genero"
                                    value="Macho"
                                    checked={petData.genero === 'Macho'}
                                    onChange={handleChange}
                                />
                                Macho
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="genero"
                                    value="Fêmea"
                                    checked={petData.genero === 'Fêmea'}
                                    onChange={handleChange}
                                />
                                Fêmea
                            </label>
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <label>Temperamento</label>
                        <select 
                            name="temperamento" 
                            value={petData.temperamento} 
                            onChange={handleChange}
                        >
                            <option value="">Selecione</option>
                            <option value="Calmo">Calmo</option>
                            <option value="Brincalhão">Brincalhão</option>
                            <option value="Energético">Energético</option>
                            <option value="Timido">Tímido</option>
                        </select>
                    </div>
                </div>
                
                <div className="form-group">
                    <label>Cuidados especiais</label>
                    <input
                        type="text"
                        name="cuidados"
                        value={petData.cuidados}
                        onChange={handleChange}
                        placeholder="Ex: Medicamento diário, dieta especial"
                    />
                </div>
                
                <div className="form-group">
                    <label>Comentários</label>
                    <textarea
                        name="descricao"
                        value={petData.descricao}
                        onChange={handleChange}
                        placeholder="Detalhes sobre o pet"
                        rows="3"
                    ></textarea>
                </div>
                
                <div className="form-group">
                    <label>Descrição completa</label>
                    <textarea
                        name="descricao"
                        value={petData.descricao}
                        onChange={handleChange}
                        placeholder="Comportamento, personalidade, história..."
                        rows="5"
                    ></textarea>
                </div>
                
                <div className="form-group">
                    <label>Fotos do Pet</label>
                    <div className="photos-container">
                        {petData.fotos.map((photo, index) => (
                            <div key={index} className="photo-preview">
                                <img src={photo} alt={`Pet ${index}`} />
                                <button 
                                    type="button" 
                                    className="remove-photo"
                                    onClick={() => removePhoto(index)}
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                        
                        <label className="add-photo-btn">
                            <FaCamera className="camera-icon" />
                            <span>Adicionar foto</span>
                            <input 
                                type="file" 
                                accept="image/*" 
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                            />
                        </label>
                    </div>
                </div>
                
                <button type="submit" className="configurado-button">
                    + Adicionar
                </button>
            </form>
        </div>
    );
}

export default CadastroPet;