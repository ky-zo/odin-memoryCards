import Card from './Card'
import images from '../../src/assets/images/images.json'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

function Game() {
    const [cards, setCards] = useState(images.map((item) => ({ ...item, id: uuidv4() })))
    const [activeCards, setActiveCards] = useState([])

    function handleNewGameSetup(numberOfCards) {
        let randomNumbers = []
        let tempNumber = ''
        let newActiveCards = []

        for (let i = 0; i < numberOfCards; i++) {
            do {
                tempNumber = Math.floor(Math.random() * cards.length)
            } while (randomNumbers.includes(tempNumber))

            randomNumbers.push(tempNumber)
            newActiveCards.push(cards[tempNumber])
        }
        setActiveCards(newActiveCards)
    }

    useEffect(() => {
        handleNewGameSetup(10)
    }, [])

    return (
        <>
            {activeCards.map((card) => {
                return <Card key={card.id} image={card.imagesrc} name={card.name} />
            })}
        </>
    )
}

export default Game
