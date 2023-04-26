import { useEffect, useState } from 'react'
import Game from './Components/Game'

function App() {
    return (
        <div className="flex flex-col h-screen w-screen items-center">
            <div className="h-1/6">Top bar</div>
            <div className="flex-1 flex gap-x-4 gap-y-4 justify-center items-center flex-wrap w-4/5">
                <Game />
            </div>
            <div className="h-1/6">Bottom bar</div>
        </div>
    )
}

export default App
