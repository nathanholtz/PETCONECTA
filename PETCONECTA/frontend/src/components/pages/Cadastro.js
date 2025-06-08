import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../axios';
import '../estilos/Cadastro.css';

function Cadastro() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    nome: '',
    telefone: '',
    endereco: '',
    tipo: '',
    cep: '',
    cidade: '',
    uf: '',
    senha: '',
    confirmasenha: '',
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }

    if (apiError) {
      setApiError('');
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'E-mail é obrigatório';
    if (!formData.nome) newErrors.nome = 'Nome é obrigatório';
    if (!formData.telefone) newErrors.telefone = 'Telefone é obrigatório';
    if (!formData.endereco) newErrors.endereco = 'Endereço é obrigatório';
    if (!formData.cep) newErrors.cep = 'CEP é obrigatório';
    if (!formData.cidade) newErrors.cidade = 'Cidade é obrigatória';
    if (!formData.uf) newErrors.uf = 'UF é obrigatória';
    if (!formData.tipo) newErrors.tipo = 'Selecione um tipo';
    if (!formData.senha) newErrors.senha = 'Senha é obrigatória';
    if (!formData.confirmasenha) newErrors.confirmasenha = 'Confirmação da senha é obrigatória';
    if (formData.senha !== formData.confirmasenha)
      newErrors.confirmasenha = 'A senha e a confirmação precisam ser iguais';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const response = await api.post('/users/register', formData, {
        withCredentials: true,
      });

      localStorage.setItem('token', response.data.token);
      setApiError('');
      navigate('/');
    } catch (error) {
      let mensagemFinal = 'Erro ao cadastrar. Verifique os dados.';

      if (error.response && error.response.data) {
        const data = error.response.data;

        if (data.errors && typeof data.errors === 'object') {
          const mensagens = Object.values(data.errors).map((err) =>
            err?.message ? err.message : JSON.stringify(err)
          );
          mensagemFinal = mensagens.join('; ');
        } else if (data.message) {
          mensagemFinal = data.message;
        } else if (typeof data === 'string') {
          mensagemFinal = data;
        }
      }

      setApiError(mensagemFinal);
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
          <label htmlFor="cep">CEP</label>
          <input
            type="text"
            id="cep"
            name="cep"
            value={formData.cep}
            onChange={handleChange}
            className={`cadastro-input ${errors.cep ? 'error' : ''}`}
            placeholder="Digite seu cep"
          />
          {errors.cep && <span className="error-message">{errors.cep}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="cidade">Cidade</label>
          <input
            type="text"
            id="cidade"
            name="cidade"
            value={formData.cidade}
            onChange={handleChange}
            className={`cadastro-input ${errors.cidade ? 'error' : ''}`}
            placeholder="Digite o nome da sua cidade"
          />
          {errors.cidade && <span className="error-message">{errors.cidade}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="uf">UF</label>
          <input
            type="text"
            id="uf"
            name="uf"
            value={formData.uf}
            onChange={handleChange}
            className={`cadastro-input ${errors.uf ? 'error' : ''}`}
            placeholder="Digite o nome do seu estado"
          />
          {errors.uf && <span className="error-message">{errors.uf}</span>}
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

        <div className="form-group">
          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            id="senha"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
            className={`cadastro-input ${errors.senha ? 'error' : ''}`}
            placeholder="Digite sua senha"
          />
          {errors.senha && <span className="error-message">{errors.senha}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="confirmasenha">Confirme a Senha</label>
          <input
            type="password"
            id="confirmasenha"
            name="confirmasenha"
            value={formData.confirmasenha}
            onChange={handleChange}
            className={`cadastro-input ${errors.confirmasenha ? 'error' : ''}`}
            placeholder="Confirme sua senha"
          />
          {errors.confirmasenha && (
            <span className="error-message">{errors.confirmasenha}</span>
          )}
        </div>

        <div className="obrigatorio-notice">
          <span>* Campos obrigatórios</span>
        </div>

        {apiError && typeof apiError === 'string' && (
          <p className="error-message api-error">{apiError}</p>
        )}

        <button type="submit" className="cadastro-button">
          Salvar Cadastro
        </button>
      </form>
    </div>
  );
}

export default Cadastro;
