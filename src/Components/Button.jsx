import { useEffect, useState } from 'react'

function Button({ onNewGame, difficultyLevel, action }) {
    const [visible, setVisible] = useState('')

    useEffect(() => {
        if (action === '') {
            setVisible('hidden')
        } else {
            setVisible('')
        }
    }, [action])

    return (
        <button
            className={`${visible} rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all`}
            onClick={() => onNewGame(difficultyLevel)}
        >
            {action} <span aria-hidden="true">→</span>
        </button>
    )
}

export default Button
