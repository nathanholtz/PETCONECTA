import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../estilos/Matches.css'
import { FaComment, FaHeart } from 'react-icons/fa'
import axios from '../../axios'

function Matches() {
  const [matches, setMatches] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchMatches() {
      try {
        const res = await axios.get('/pets/match', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        setMatches(res.data.matches)
      } catch (err) {
        console.error('Erro ao buscar matches:', err.response?.data)
      }
    }

    fetchMatches()
  }, [])

  const openChat = (matchId) => {
    navigate(`/chat/${matchId}`)
  }

  return (
    <div className="matches-container">
      <div className="matches-header">
        <h1>MATCHES</h1>
      </div>

      <div className="matches-list">
        {matches.map((match) => (
          <div key={match._id} className="match-card">
            <div className="match-photo">
              <img
                src={`http://localhost:5000/images/pets/${match.image[0]}`}
                alt={match.nome}
                className="match-avatar"
              />
            </div>

            <div className="match-info">
              <div className="match-header">
                <h2 className="match-name">{match.nome}</h2>
                <span className="match-status">Disponível</span>
              </div>

              <div className="match-pet">
                <FaHeart className="heart-icon" />
                <span>{match.nome}</span>
              </div>
            </div>

            <button
              className="chat-button"
              onClick={() => openChat(match._id)}
            >
              <FaComment className="comment-icon" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Matches
