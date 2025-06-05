import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../estilos/Cadastro.css';

function Cadastro() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        nome: '',
        telefone: '',
        endereco: '',
        tipo: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Limpa erro quando o usuário começa a digitar
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.email) newErrors.email = 'E-mail é obrigatório';
        if (!formData.nome) newErrors.nome = 'Nome é obrigatório';
        if (!formData.telefone) newErrors.telefone = 'Telefone é obrigatório';
        if (!formData.endereco) newErrors.endereco = 'Endereço é obrigatório';
        if (!formData.tipo) newErrors.tipo = 'Selecione um tipo';
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
        } else {
            // Lógica para enviar os dados do cadastro
            console.log('Dados do cadastro:', formData);
            // Redirecionar para home ou outra página
            navigate('/');
        }
    };

    return (
        <div className="cadastro-container">
            <h1 className="cadastro-title">MEU CADASTRO</h1>
            
            <form className="cadastro-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">E-mail</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`cadastro-input ${errors.email ? 'error' : ''}`}
                        placeholder="Digite seu e-mail"
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
                
                <div className="form-group">
                    <label htmlFor="nome">Nome</label>
                    <input
                        type="text"
                        id="nome"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        className={`cadastro-input ${errors.nome ? 'error' : ''}`}
                        placeholder="Digite seu nome completo"
                    />
                    {errors.nome && <span className="error-message">{errors.nome}</span>}
                </div>
                
                <div className="form-group">
                    <label htmlFor="telefone">Telefone</label>
                    <input
                        type="tel"
                        id="telefone"
                        name="telefone"
                        value={formData.telefone}
                        onChange={handleChange}
                        className={`cadastro-input ${errors.telefone ? 'error' : ''}`}
                        placeholder="(00) 00000-0000"
                    />
                    {errors.telefone && <span className="error-message">{errors.telefone}</span>}
                </div>
                
                <div className="form-group">
                    <label htmlFor="endereco">Endereço</label>
                    <input
                        type="text"
                        id="endereco"
                        name="endereco"
                        value={formData.endereco}
                        onChange={handleChange}
                        className={`cadastro-input ${errors.endereco ? 'error' : ''}`}
                        placeholder="Digite seu endereço completo"
                    />
                    {errors.endereco && <span className="error-message">{errors.endereco}</span>}
                </div>
                
                <div className="form-group">
                    <label htmlFor="tipo">Tipo</label>
                    <select
                        id="tipo"
                        name="tipo"
                        value={formData.tipo}
                        onChange={handleChange}
                        className={`cadastro-input ${errors.tipo ? 'error' : ''}`}
                    >
                        <option value="">Selecione seu tipo</option>
                        <option value="Tutor">Tutor</option>
                        <option value="Protetor">Protetor</option>
                        <option value="Abrigo">Abrigo</option>
                    </select>
                    {errors.tipo && <span className="error-message">{errors.tipo}</span>}
                </div>
                
                <div className="obrigatorio-notice">
                    <span>* Campos obrigatórios</span>
                </div>
                
                <button type="submit" className="cadastro-button">
                    Salvar Cadastro
                </button>
            </form>
        </div>
    );
}

export default Cadastro;