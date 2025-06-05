import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../estilos/Login.css';

function LoginScreen() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        nome: 'Senna',
        email: 'senna@example.com',
        // Adicione outros campos conforme necessário
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica para salvar os dados do perfil
        console.log('Dados salvos:', userData);
        // Redirecionar para outra página ou mostrar mensagem de sucesso
        navigate('/'); // Volta para a home após salvar
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
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="nome">Nome</label>
                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            value={userData.nome}
                            onChange={handleChange}
                            className="perfil-input"
                        />
                    </div>
                    
                    <button type="submit" className="enter-button">
                        Enter
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