import React, { useEffect, useState } from 'react'
import TinderCard from 'react-tinder-card'
import { useNavigate } from 'react-router-dom'; 
import '../layout/Home.css'
import axios from '../../axios';


function Home(){
    const [pets, setPet] = useState([ ])
    const navigate = useNavigate(); // Declaração da variável navigate

    useEffect(() => {
        async function fetchData() {
            
            const req = await axios.get('/pets/')
            setPet(req.data.pets)
        }

        fetchData()
    }, [])

    const swiped = (direction, nameToDelete) => {
        console.log('removing: ' + nameToDelete)
    }
    const outOfFrame = (nome) => {
        console.log(nome + 'left the screen!')
    }
     return(
        <div className="home-container">
            {/* Área dos cards (mantida igual) */}
            <div className='tinderCards'>
                <div className='cardContainer'> 
                    {pets.map((pet) => (
                        <TinderCard 
                            className='swipe'
                            key={pet._id}
                            preventSwipe={['up','down']}
                            onSwipe={(dir) => swiped(dir, pet.nome)}
                            onCardLeftScreen={() => outOfFrame(pet.nome)}
                        >
                            <div 
                                style={{backgroundImage: `url(http://localhost:5000/images/pets/${pet.image[0]})`}}
                                className='card'
                            >
                                <h3>{pet.nome}</h3>
                            </div>
                        </TinderCard>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home