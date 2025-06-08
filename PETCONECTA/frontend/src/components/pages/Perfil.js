import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../estilos/Perfil.css';

function Perfil() {
    const [usuario, setUsuario] = useState(null);
    const [editando, setEditando] = useState(false);
    const [carregando, setCarregando] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const carregarPerfil = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const response = await axios.get('http://localhost:5000/users/checkuser', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (!response.data || !response.data._id) {
                    navigate('/login');
                } else {
                    setUsuario(response.data);
                }

            } catch (error) {
                console.error('Erro ao carregar perfil:', error);
                navigate('/login');
            } finally {
                setCarregando(false);
            }
        };

        carregarPerfil();
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsuario(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUsuario(prev => ({
                ...prev,
                imageFile: file // campo temporário para envio
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            const formData = new FormData();

            // adiciona todos os campos
            for (let key in usuario) {
                if (key !== 'imageFile') {
                    formData.append(key, usuario[key]);
                }
            }

            // adiciona imagem se existir
            if (usuario.imageFile) {
                formData.append('image', usuario.imageFile);
            }

            const response = await axios.patch(
                `http://localhost:5000/users/edit/${usuario._id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            alert('Perfil atualizado com sucesso!');
            setUsuario(prev => ({
                ...prev,
                image: usuario.imageFile ? usuario.imageFile.name : prev.image,
                imageFile: undefined
            }));
            setEditando(false);

        } catch (error) {
            console.error('Erro ao atualizar perfil:', error);
            alert('Erro ao atualizar perfil.');
        }
    };

    if (carregando) return <div className="perfil-container">Carregando perfil...</div>;
    if (!usuario) return <div className="perfil-container">Usuário não encontrado</div>;

    return (
        <div className="perfil-container">
            <h1>MEU PERFIL</h1>
            <form onSubmit={handleSubmit} className="perfil-form">
                <div className="form-group">
                    <label>Nome</label>
                    {editando ? (
                        <input type="text" name="nome" value={usuario.nome || ''} onChange={handleChange} />
                    ) : (
                        <p>{usuario.nome}</p>
                    )}
                </div>

                <div className="form-group">
                    <label>E-mail</label>
                    {editando ? (
                        <input type="email" name="email" value={usuario.email || ''} onChange={handleChange} />
                    ) : (
                        <p>{usuario.email}</p>
                    )}
                </div>

                <div className="form-group">
                    <label>Telefone</label>
                    {editando ? (
                        <input type="tel" name="telefone" value={usuario.telefone || ''} onChange={handleChange} />
                    ) : (
                        <p>{usuario.telefone}</p>
                    )}
                </div>

                <div className="form-group">
                    <label>CEP</label>
                    {editando ? (
                        <input type="text" name="cep" value={usuario.cep || ''} onChange={handleChange} />
                    ) : (
                        <p>{usuario.cep}</p>
                    )}
                </div>

                <div className="form-group">
                    <label>Cidade</label>
                    {editando ? (
                        <input type="text" name="cidade" value={usuario.cidade || ''} onChange={handleChange} />
                    ) : (
                        <p>{usuario.cidade}</p>
                    )}
                </div>

                <div className="form-group">
                    <label>UF</label>
                    {editando ? (
                        <input type="text" name="uf" value={usuario.uf || ''} onChange={handleChange} maxLength="2" />
                    ) : (
                        <p>{usuario.uf}</p>
                    )}
                </div>

                <div className="form-group">
                    <label>Endereço</label>
                    {editando ? (
                        <input type="text" name="endereco" value={usuario.endereco || ''} onChange={handleChange} />
                    ) : (
                        <p>{usuario.endereco}</p>
                    )}
                </div>


                <div className="form-group">
                    <label>Tipo</label>
                    {editando ? (
                        <select name="tipo" value={usuario.tipo || 'Tutor'} onChange={handleChange}>
                            <option value="Tutor">Tutor</option>
                            <option value="Protetor">Protetor</option>
                            <option value="Abrigo">Abrigo</option>
                        </select>
                    ) : (
                        <p>{usuario.tipo}</p>
                    )}
                </div>

                <div className="form-group">
                    <label>Foto de perfil</label>
                    {editando ? (
                        <>
                            <input
                                type="file"
                                name="image"
                                accept="image/png, image/jpeg"
                                onChange={handleFileChange}
                            />
                            {usuario.image && (
                                <img
                                    src={`http://localhost:5000/images/users/${usuario.image}`}
                                    alt="Foto atual"
                                    width={100}
                                    style={{ marginTop: '10px' }}
                                />
                            )}
                        </>
                    ) : (
                        usuario.image && (
                            <img
                                src={`http://localhost:5000/images/users/${usuario.image}`}
                                alt="Foto de perfil"
                                width={100}
                            />
                        )
                    )}
                </div>

                <div className="form-buttons">
                    {editando ? (
                        <>
                            <button type="button" className="cancel-button" onClick={() => setEditando(false)}>Cancelar</button>
                            <button type="submit" className="save-button">Salvar Alterações</button>
                        </>
                    ) : (
                        <button type="button" className="edit-button" onClick={() => setEditando(true)}>EDITAR PERFIL</button>
                    )}
                </div>
            </form>
        </div>
    );
}

export default Perfil;
