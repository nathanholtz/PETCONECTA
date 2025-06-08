import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../estilos/CadastroPet.css';
import { FaCamera } from 'react-icons/fa';

function CadastroPet() {
    const navigate = useNavigate();
    const [petData, setPetData] = useState({
        nome: '',
        status: 'Disponível para adoção',
        idade: '',
        tipo: '',
        porte: '',
        genero: 'Macho',
        temperamento: '',
        cuidados: '',
        descricao: '',
        peso: '',
        cor: '',
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
            const file = e.target.files[0];
            const preview = URL.createObjectURL(file);
            setPetData(prev => ({
                ...prev,
                fotos: [...prev.fotos, { file, preview }]
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('nome', petData.nome);
        formData.append('tipo', petData.tipo);
        formData.append('status', petData.status);
        formData.append('idade', petData.idade);
        formData.append('peso', petData.peso);
        formData.append('cor', petData.cor);
        formData.append('porte', petData.porte);
        formData.append('genero', petData.genero);
        formData.append('cuidados', petData.cuidados);
        formData.append('descricao', petData.descricao);

        petData.fotos.forEach((photo) => {
            formData.append('image', photo.file);
        });

        try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:5000/pets/create', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            });

            const data = await res.json();
            if (res.ok) {
                alert('Pet cadastrado com sucesso!');
                navigate('/pets/mypets');
            } else {
                alert(data.message || 'Erro ao cadastrar pet!');
            }
        } catch (err) {
            console.error(err);
            alert('Erro ao conectar com o servidor.');
        }
    };

    return (
        <div className="cadastro-pet-container">
            <h1 className="cadastro-pet-title">CADASTRO-PET</h1>
            <form onSubmit={handleSubmit} className="cadastro-pet-form">

                <div className="form-group">
                    <label>Nome do Pet</label>
                    <input type="text" name="nome" value={petData.nome} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Tipo do Animal</label>
                    <div className="radio-group">
                        {['Cachorro', 'Gato', 'Coelho', 'Pássaro', 'Outro'].map((tipo) => (
                            <label key={tipo}>
                                <input
                                    type="radio"
                                    name="tipo"
                                    value={tipo}
                                    checked={petData.tipo === tipo}
                                    onChange={handleChange}
                                />
                                {tipo}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="form-group">
                    <label>Status</label>
                    <select name="status" value={petData.status} onChange={handleChange}>
                        <option value="Disponível para adoção">Disponível para adoção</option>
                        <option value="Em processo de adoção">Em processo de adoção</option>
                        <option value="Adotado">Adotado</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Idade</label>
                    <input type="text" name="idade" value={petData.idade} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Peso (kg)</label>
                    <input type="number" name="peso" value={petData.peso} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Cor</label>
                    <input type="text" name="cor" value={petData.cor} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Porte</label>
                    <div className="radio-group">
                        {['P', 'M', 'G'].map((porte) => (
                            <label key={porte}>
                                <input type="radio" name="porte" value={porte} checked={petData.porte === porte} onChange={handleChange} />
                                {porte}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="form-group">
                    <label>Gênero</label>
                    <div className="radio-group">
                        {['Macho', 'Fêmea'].map((g) => (
                            <label key={g}>
                                <input type="radio" name="genero" value={g} checked={petData.genero === g} onChange={handleChange} />
                                {g}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="form-group">
                    <label>Cuidados especiais</label>
                    <input type="text" name="cuidados" value={petData.cuidados} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Descrição completa</label>
                    <textarea name="descricao" value={petData.descricao} onChange={handleChange} rows="5" />
                </div>

                <div className="form-group">
                    <label>Fotos do Pet</label>
                    <div className="photos-container">
                        {petData.fotos.map((photo, index) => (
                            <div key={index} className="photo-preview">
                                <img src={photo.preview} alt={`Pet ${index}`} />
                                <button type="button" className="remove-photo" onClick={() => removePhoto(index)}>×</button>
                            </div>
                        ))}
                        <label className="add-photo-btn">
                            <FaCamera className="camera-icon" />
                            <span>Adicionar foto</span>
                            <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
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
