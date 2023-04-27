import { useEffect, useState } from 'react'
import Card from './Components/Card'
import images from '../src/assets/images/images.json'
import { v4 as uuidv4 } from 'uuid'

function App() {
    const [cards, setCards] = useState(images.map((item) => ({ ...item, id: uuidv4() })))
    const [activeCards, setActiveCards] = useState([])
    const [buttonText, setButtonText] = useState('Start the Game')
    const [bestScore, setBestScore] = useState(0)
    const [isGameFinished, setIsGameFinished] = useState(false)

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
        setButtonText('Start Again...')
    }

    function handlePlayerMove(playedCard) {
        let isGameFinished = false

        setActiveCards((prevState) =>
            prevState.map((card) => {
                if (playedCard === card.name) {
                    if (card.played === true) {
                        setIsGameFinished(true)
                        return { ...card, played: true }
                    } else {
                        // setCurrentScore((prevState) => prevState + 1) //WHY IS THIS FUNCTION ADDING 2, NOT 1? SHOULD I USE USEEFFECT?
                        return { ...card, played: true }
                    }
                } else {
                    return card
                }
            })
        )
    }

    useEffect(() => {
        if (!isGameFinished) return
        setActiveCards([])
        setBestScore(activeCards.filter((item) => item.played === true).length)
        return setIsGameFinished(false)
    }, [isGameFinished])

    return (
        <div className="flex flex-col h-screen w-screen items-center">
            <div className="h-2/6">
                <div className="mx-auto max-w-2xl py-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Memory Game</h1>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Ready to test your memory? Rules are simple: you can click the same card only once. Pick same card twice? You
                            loose.
                        </p>
                        <div className="mt-4 flex items-center justify-center gap-x-6">
                            <button
                                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onClick={() => handleNewGameSetup(4)}
                            >
                                {buttonText} <span aria-hidden="true">→</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-1 flex gap-x-4 gap-y-4 justify-center items-center flex-wrap w-4/5">
                {activeCards.map((card) => {
                    return <Card key={card.id} image={card.imagesrc} name={card.name} onPlayerMove={handlePlayerMove} />
                })}
            </div>
            <div className="h-1/6 text-center">
                <p className="mt-6 text-xl leading-8 text-gray-600">
                    Current Score: {activeCards.filter((item) => item.played === true).length}{' '}
                </p>
                <p className="mt-1 text-lg leading-8 text-gray-400">Your Best Score: {bestScore}</p>
            </div>
        </div>
    )
}

export default App
