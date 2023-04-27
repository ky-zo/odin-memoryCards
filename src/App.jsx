import { useEffect, useState } from 'react'
import Card from './Components/Card'
import Button from './Components/Button'
import images from '../src/assets/images/images.json'
import { v4 as uuidv4 } from 'uuid'

const LOCAL_STORAGE_KEY = 'memorygame_kyzo'

function App() {
    const [saveData, setSaveData] = useState(false)
    const [cards, setCards] = useState(images.map((item) => ({ ...item, id: uuidv4() })))
    const [activeCards, setActiveCards] = useState([])
    const [difficultyLevel, setDifficultyLevel] = useState(4)
    const [accumulatedPoints, setAccumulatedPoints] = useState(0)
    const [bestScore, setBestScore] = useState(0)
    const [headerMessage, setHeaderMessage] = useState('Ready to test your memory? 🚀')
    const [subHeaderMessage, setSubHeaderMessage] = useState(
        'Rules are simple: you can click the same card only once. Pick same card twice? You loose.'
    )
    const [isGameFinished, setIsGameFinished] = useState(false)
    const [nextAction, setNextAction] = useState('Play') // Play, Level Up, Play Again or ""

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
        setNextAction('')
        setHeaderMessage('Playing... 🧠')
        setSubHeaderMessage('Pick your first card and remember it. You should never click the same card twice.')
    }

    function handlePlayerMove(playedCard) {
        setActiveCards((prevState) =>
            prevState.map((card) => {
                if (playedCard === card.name) {
                    if (card.played === true) {
                        setIsGameFinished(true)
                        return { ...card, played: true }
                    } else {
                        setHeaderMessage(`Nicely done! 🙌`)
                        setSubHeaderMessage(`${playedCard} was never picked before! Keep it up!`)
                        return { ...card, played: true }
                    }
                } else {
                    return card
                }
            })
        )
    }

    function shuffle(array) {
        let currentIndex = array.length
        let temporaryValue, randomIndex

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex -= 1

            temporaryValue = array[currentIndex]
            array[currentIndex] = array[randomIndex]
            array[randomIndex] = temporaryValue
        }

        return array
    }

    useEffect(() => {
        if (!(activeCards.filter((item) => item.played === true).length === activeCards.length) || activeCards.length === 0) return
        setHeaderMessage(`Yoo! Good work! 🆙`)
        setSubHeaderMessage(`Time to level up! Next difficulty level: ${difficultyLevel + 2}`)
        setDifficultyLevel((prevState) => prevState + 2)
        setAccumulatedPoints((prevState) => prevState + activeCards.length)
        setNextAction('Level Up')
        setActiveCards([])
    }, [activeCards])

    useEffect(() => {
        if (!isGameFinished) return
        let lastScore = activeCards.filter((item) => item.played === true).length + accumulatedPoints
        if (lastScore > bestScore) setBestScore(lastScore)
        setSaveData(true)
        if (lastScore < 19) {
            setHeaderMessage(`Bummer! Mistake! 💩`)
            setSubHeaderMessage(`You've scored ${lastScore} points. Can you make it at least 20?`)
        } else {
            setHeaderMessage(`Yabba dabadu! 🔥`)
            setSubHeaderMessage(`What a score! ${lastScore} points! Wanna play again?`)
        }
        setActiveCards([])
        setDifficultyLevel(4)
        setAccumulatedPoints(0)
        setNextAction('Play Again')
        return setIsGameFinished(false)
    }, [isGameFinished])

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
        if (storedData) {
            if (storedData.bestScore) setBestScore(storedData.bestScore)
        }
    }, [])

    useEffect(() => {
        if (saveData) {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ bestScore }))
            setSaveData(false)
        }
    }, [saveData, bestScore])

    return (
        <div className="flex flex-col h-screen w-screen items-center transition-all">
            <div className="h-2/6">
                <div className="mx-auto max-w-2xl py-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Memory Game</h1>
                        <p className="mt-6 text-lg leading-8 text-gray-600">{headerMessage}</p>
                        <p className="text-md leading-8 text-gray-600">{subHeaderMessage}</p>
                        <div className="mt-4 flex items-center justify-center gap-x-6">
                            <Button onNewGame={handleNewGameSetup} difficultyLevel={difficultyLevel} action={nextAction} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-1 flex gap-x-4 gap-y-4 justify-center items-center flex-wrap w-4/5">
                {shuffle([...activeCards]).map((card) => {
                    return (
                        <Card key={card.id} image={card.imagesrc} name={card.name} onPlayerMove={handlePlayerMove} played={card.played} />
                    )
                })}
            </div>
            <div className="h-1/6 text-center">
                <p className="mt-6 text-xl leading-8 text-gray-600">
                    Current Score: {activeCards.filter((item) => item.played === true).length + accumulatedPoints}
                </p>
                <p className="mt-1 text-lg leading-8 text-gray-400">Your Best Score: {bestScore}</p>
            </div>
        </div>
    )
}

export default App
