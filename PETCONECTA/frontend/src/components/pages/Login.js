import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../axios'; // certifique-se de que esse arquivo existe
import '../estilos/Login.css';

function LoginScreen() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: '',
    senha: ''
  });

  const [apiError, setApiError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
    setApiError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/users/login', userData);
      localStorage.setItem('token', response.data.token);
      navigate('/'); // redireciona para home após login
    } catch (err) {
      if (err.response && err.response.data.message) {
        setApiError(err.response.data.message);
      } else {
        setApiError('Erro ao conectar ao servidor.');
      }
    }
  };

  return (
    <div className="perfil-container">
      <div className="perfil-header">
        <h1 className="logo">PETCONECTA</h1>
      </div>

      <div className="perfil-content">
        <form className="perfil-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className="perfil-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              value={userData.senha}
              onChange={handleChange}
              className="perfil-input"
              required
            />
          </div>

          {apiError && <div className="error-message">{apiError}</div>}

          <button type="submit" className="enter-button">
            Entrar
          </button>
        </form>

        <div className="primeira-vez">
          <p>Primeira vez? <Link to="/cadastro">Cadastre-se</Link></p>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
