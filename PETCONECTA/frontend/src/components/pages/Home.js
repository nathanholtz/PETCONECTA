import React, { useEffect, useState } from 'react'
import TinderCard from 'react-tinder-card'
import { useNavigate } from 'react-router-dom'
import '../layout/Home.css'
import axios from '../../axios'

function Home() {
  const [pets, setPet] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchData() {
      try {
        const req = await axios.get('/pets/')
        setPet(req.data.pets)
      } catch (err) {
        console.error('Erro ao buscar pets:', err)
      }
    }

    fetchData()
  }, [])

  const swiped = async (direction, nome, petId) => {
    console.log('Swipe: ' + direction + ' - ' + nome)

    if (direction === 'right') {
      try {
        await axios.post(
          '/pets/match',
          { petId },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        )
        console.log('Pet adicionado aos matches com sucesso!')
      } catch (err) {
        console.error('Erro ao salvar match:', err.response?.data)
      }
    }
  }

  const outOfFrame = (nome) => {
    console.log(nome + ' saiu da tela!')
  }

  return (
    <div className="home-container">
      <div className="tinderCards">
        <div className="cardContainer">
          {pets.map((pet) => (
            <TinderCard
              className="swipe"
              key={pet._id}
              preventSwipe={['up', 'down']}
              onSwipe={(dir) => swiped(dir, pet.nome, pet._id)}
              onCardLeftScreen={() => outOfFrame(pet.nome)}
            >
              <div
                style={{
                  backgroundImage: `url(http://localhost:5000/images/pets/${pet.image[0]})`
                }}
                className="card"
              >
                <h3>{pet.nome}</h3>
              </div>
            </TinderCard>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
