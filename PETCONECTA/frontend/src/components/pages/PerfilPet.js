import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../estilos/PerfilPet.css';

function PerfilPet() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pet, setPet] = useState({
        nome: '',
        status: '',
        dataEvento: '',
        contato: '',
        endereco: '',
        especie: '',
        raca: '',
        porte: 'M',
        cor: '',
        castrado: false,
        vacinado: false,
        descricao: ''
    });
    
    const [editando, setEditando] = useState(false);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState('');

    useEffect(() => {
        const carregarPet = async () => {
            try {
                // Substituir pela chamada real à API
                // const response = await axios.get(`/api/pets/${id}`);
                // setPet(response.data);
                
                // Dados simulados
                setTimeout(() => {
                    setPet({
                        nome: 'Rex',
                        status: 'Perdido',
                        dataEvento: '2023-10-15',
                        contato: '(11) 98765-4321',
                        endereco: 'Rua das Flores, 123 - Jardim Paulista',
                        especie: 'Cachorro',
                        raca: 'Vira-lata',
                        porte: 'M',
                        cor: 'Caramelo',
                        castrado: true,
                        vacinado: true,
                        descricao: 'Cão muito brincalhão, usa coleira azul com identificação'
                    });
                    setCarregando(false);
                }, 1000);
            } catch (error) {
                console.error('Erro ao carregar pet:', error);
                setErro('Erro ao carregar informações do pet');
                setCarregando(false);
            }
        };
        
        carregarPet();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPet(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setPet(prev => ({ ...prev, [name]: checked }));
    };

    const handleSalvar = async () => {
        try {
            // Chamada para atualizar o pet
            // await axios.put(`/api/pets/${id}`, pet);
            alert('Alterações salvas com sucesso!');
            setEditando(false);
        } catch (error) {
            console.error('Erro ao atualizar pet:', error);
            alert('Erro ao salvar alterações');
        }
    };

    const handleExcluir = async () => {
        if (window.confirm('Tem certeza que deseja excluir este pet? Esta ação não pode ser desfeita.')) {
            try {
                // await axios.delete(`/api/pets/${id}`);
                alert('Pet excluído com sucesso');
                navigate('/meus-pets');
            } catch (error) {
                console.error('Erro ao excluir pet:', error);
                alert('Erro ao excluir pet');
            }
        }
    };

    if (carregando) {
        return <div className="perfil-pet-container">Carregando...</div>;
    }

    if (erro) {
        return <div className="perfil-pet-container">{erro}</div>;
    }

    return (
        <div className="perfil-pet-container">
            <h1>{pet.nome.toUpperCase()}</h1>
            <p className="bloqueado">NomePet - bloqueado</p>
            
            <form className="perfil-pet-form">
                <div className="form-group">
                    <label>Selecionar Status</label>
                    {editando ? (
                        <select 
                            name="status" 
                            value={pet.status} 
                            onChange={handleChange}
                        >
                            <option value="Encontrado">Encontrado</option>
                            <option value="Perdido">Perdido</option>
                            <option value="Disponível para adoção">Disponível para adoção</option>
                            <option value="Adotado">Adotado</option>
                        </select>
                    ) : (
                        <p>{pet.status}</p>
                    )}
                </div>
                
                <div className="form-group">
                    <label>Encontrado/Perdido?</label>
                    {editando ? (
                        <input
                            type="date"
                            name="dataEvento"
                            value={pet.dataEvento}
                            onChange={handleChange}
                        />
                    ) : (
                        <p>{new Date(pet.dataEvento).toLocaleDateString('pt-BR')}</p>
                    )}
                </div>
                
                <div className="form-group">
                    <label>Contato</label>
                    {editando ? (
                        <input
                            type="text"
                            name="contato"
                            value={pet.contato}
                            onChange={handleChange}
                        />
                    ) : (
                        <p>{pet.contato}</p>
                    )}
                </div>
                
                <div className="form-group">
                    <label>Endereço</label>
                    {editando ? (
                        <input
                            type="text"
                            name="endereco"
                            value={pet.endereco}
                            onChange={handleChange}
                        />
                    ) : (
                        <p>{pet.endereco}</p>
                    )}
                </div>
                
                <div className="form-group">
                    <label>Espécie - bloqueado/n muda</label>
                    <p>{pet.especie}</p>
                </div>
                
                <div className="form-group">
                    <label>Raça - bloqueado/n muda</label>
                    <p>{pet.raca}</p>
                </div>
                
                <div className="form-row">
                    <div className="form-group">
                        <label>Porte P/M/G</label>
                        {editando ? (
                            <select
                                name="porte"
                                value={pet.porte}
                                onChange={handleChange}
                            >
                                <option value="P">Pequeno</option>
                                <option value="M">Médio</option>
                                <option value="G">Grande</option>
                            </select>
                        ) : (
                            <p>{pet.porte === 'P' ? 'Pequeno' : pet.porte === 'M' ? 'Médio' : 'Grande'}</p>
                        )}
                    </div>
                    
                    <div className="form-group">
                        <label>Cor</label>
                        {editando ? (
                            <input
                                type="text"
                                name="cor"
                                value={pet.cor}
                                onChange={handleChange}
                            />
                        ) : (
                            <p>{pet.cor}</p>
                        )}
                    </div>
                </div>
                
                <div className="form-row">
                    <div className="form-group">
                        <label>Castrado?</label>
                        {editando ? (
                            <input
                                type="checkbox"
                                name="castrado"
                                checked={pet.castrado}
                                onChange={handleCheckboxChange}
                            />
                        ) : (
                            <p>{pet.castrado ? 'Sim' : 'Não'}</p>
                        )}
                    </div>
                    
                    <div className="form-group">
                        <label>Vacinado?</label>
                        {editando ? (
                            <input
                                type="checkbox"
                                name="vacinado"
                                checked={pet.vacinado}
                                onChange={handleCheckboxChange}
                            />
                        ) : (
                            <p>{pet.vacinado ? 'Sim' : 'Não'}</p>
                        )}
                    </div>
                </div>
                
                <div className="form-group">
                    <label>Descrição (Coleira, Comportamento...)</label>
                    {editando ? (
                        <textarea
                            name="descricao"
                            value={pet.descricao}
                            onChange={handleChange}
                            rows="4"
                        />
                    ) : (
                        <p>{pet.descricao}</p>
                    )}
                </div>
                
                <div className="form-buttons">
                    {editando ? (
                        <>
                            <button 
                                type="button" 
                                className="cancel-button"
                                onClick={() => setEditando(false)}
                            >
                                Cancelar
                            </button>
                            <button 
                                type="button" 
                                className="save-button"
                                onClick={handleSalvar}
                            >
                                Salvar Alterações
                            </button>
                        </>
                    ) : (
                        <>
                            <button 
                                type="button" 
                                className="edit-button"
                                onClick={() => setEditando(true)}
                            >
                                EDITAR PET 💬
                            </button>
                            <button 
                                type="button" 
                                className="delete-button"
                                onClick={handleExcluir}
                            >
                                Excluir Pet 💬
                            </button>
                        </>
                    )}
                </div>
            </form>
        </div>
    );
}

export default PerfilPet;