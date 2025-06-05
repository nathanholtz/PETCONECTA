import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../estilos/Perfil.css';

function PerfilUsuario() {
    const [usuario, setUsuario] = useState({
        nome: 'Ana Silva',
        email: 'ana.silva@example.com',
        telefone: '(11) 98765-4321',
        cep: '01234-567',
        cidade: 'São Paulo',
        uf: 'SP',
        endereco: 'Rua das Flores',
        bairro: 'Jardim Paulista',
        numero: '123',
        tipo: 'Tutor',
        complemento: 'Apto 45'
    });
    
    const [editando, setEditando] = useState(false);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        // Simular carregamento de dados do usuário da API
        const carregarPerfil = async () => {
            try {
                // Substitua pela chamada real à API
                // const response = await axios.get('/api/usuarios/perfil');
                // setUsuario(response.data);
                
                // Simulação de delay
                setTimeout(() => {
                    setCarregando(false);
                }, 1000);
            } catch (error) {
                console.error('Erro ao carregar perfil:', error);
                setCarregando(false);
            }
        };
        
        carregarPerfil();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsuario(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Chamada para atualizar o perfil
            // await axios.put('/api/usuarios/perfil', usuario);
            alert('Perfil atualizado com sucesso!');
            setEditando(false);
        } catch (error) {
            console.error('Erro ao atualizar perfil:', error);
            alert('Erro ao atualizar perfil');
        }
    };

    if (carregando) {
        return <div className="perfil-container">Carregando perfil...</div>;
    }

    return (
        <div className="perfil-container">
            <h1>MEU PERFIL</h1>
            
            <form onSubmit={handleSubmit} className="perfil-form">
                <div className="form-group">
                    <label>Nome</label>
                    {editando ? (
                        <input
                            type="text"
                            name="nome"
                            value={usuario.nome}
                            onChange={handleChange}
                            required
                        />
                    ) : (
                        <p>{usuario.nome}</p>
                    )}
                </div>
                
                <div className="form-group">
                    <label>E-mail</label>
                    {editando ? (
                        <input
                            type="email"
                            name="email"
                            value={usuario.email}
                            onChange={handleChange}
                            required
                        />
                    ) : (
                        <p>{usuario.email}</p>
                    )}
                </div>
                
                <div className="form-group">
                    <label>Senha</label>
                    {editando ? (
                        <input
                            type="password"
                            name="senha"
                            placeholder="Digite uma nova senha"
                            onChange={handleChange}
                        />
                    ) : (
                        <p>••••••••</p>
                    )}
                </div>
                
                <div className="form-group">
                    <label>Telefone</label>
                    {editando ? (
                        <input
                            type="tel"
                            name="telefone"
                            value={usuario.telefone}
                            onChange={handleChange}
                        />
                    ) : (
                        <p>{usuario.telefone}</p>
                    )}
                </div>
                
                <div className="form-row">
                    <div className="form-group">
                        <label>CEP</label>
                        {editando ? (
                            <input
                                type="text"
                                name="cep"
                                value={usuario.cep}
                                onChange={handleChange}
                            />
                        ) : (
                            <p>{usuario.cep}</p>
                        )}
                    </div>
                    
                    <div className="form-group">
                        <label>Cidade</label>
                        {editando ? (
                            <input
                                type="text"
                                name="cidade"
                                value={usuario.cidade}
                                onChange={handleChange}
                            />
                        ) : (
                            <p>{usuario.cidade}</p>
                        )}
                    </div>
                    
                    <div className="form-group">
                        <label>UF</label>
                        {editando ? (
                            <input
                                type="text"
                                name="uf"
                                value={usuario.uf}
                                onChange={handleChange}
                                maxLength="2"
                                style={{ width: '50px' }}
                            />
                        ) : (
                            <p>{usuario.uf}</p>
                        )}
                    </div>
                </div>
                
                <div className="form-group">
                    <label>Endereço</label>
                    {editando ? (
                        <input
                            type="text"
                            name="endereco"
                            value={usuario.endereco}
                            onChange={handleChange}
                        />
                    ) : (
                        <p>{usuario.endereco}</p>
                    )}
                </div>
                
                <div className="form-row">
                    <div className="form-group">
                        <label>Bairro</label>
                        {editando ? (
                            <input
                                type="text"
                                name="bairro"
                                value={usuario.bairro}
                                onChange={handleChange}
                            />
                        ) : (
                            <p>{usuario.bairro}</p>
                        )}
                    </div>
                    
                    <div className="form-group">
                        <label>Número</label>
                        {editando ? (
                            <input
                                type="text"
                                name="numero"
                                value={usuario.numero}
                                onChange={handleChange}
                                style={{ width: '80px' }}
                            />
                        ) : (
                            <p>{usuario.numero}</p>
                        )}
                    </div>
                </div>
                
                <div className="form-group">
                    <label>Tipo (Tutor, Protetor ou Abrigo)</label>
                    {editando ? (
                        <select
                            name="tipo"
                            value={usuario.tipo}
                            onChange={handleChange}
                        >
                            <option value="Tutor">Tutor</option>
                            <option value="Protetor">Protetor</option>
                            <option value="Abrigo">Abrigo</option>
                        </select>
                    ) : (
                        <p>{usuario.tipo}</p>
                    )}
                </div>
                
                <div className="form-group">
                    <label>Complemento</label>
                    {editando ? (
                        <input
                            type="text"
                            name="complemento"
                            value={usuario.complemento}
                            onChange={handleChange}
                        />
                    ) : (
                        <p>{usuario.complemento || 'Nenhum'}</p>
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
                            <button type="submit" className="save-button">
                                Salvar Alterações
                            </button>
                        </>
                    ) : (
                        <button 
                            type="button" 
                            className="edit-button"
                            onClick={() => setEditando(true)}
                        >
                            EDITAR PERFIL
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}

export default PerfilUsuario;