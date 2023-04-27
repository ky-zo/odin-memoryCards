import { useEffect } from 'react'

function Card({ id, image, name, onPlayerMove, played }) {
    return (
        <button
            key={id}
            className="flex flex-col shadow-xl rounded-lg aspect-[4/5] w-4/12 sm:w-3/12 md:w-2/12 p-2 items-center border hover:shadow-sm hover:border-indigo-600 hover:border-2 transition-all"
            onClick={() => {
                onPlayerMove(name)
            }}
        >
            <div className="w-16 sm:w-20 md:w-24 flex-1 align-middle relative">
                <img src={`../../src/assets/images/${image}`} className="absolute"></img>
                <img className="blur-xl -z-10 absolute" src={`../../src/assets/images/${image}`}></img>
            </div>
            <div className="text-sm">
                {name} {played}
            </div>
            <p>{played ? 'x' : ''}</p>
        </button>
    )
}

export default Card
