function Card({ id, image, name, onPlayerMove }) {
    return (
        <button
            key={id}
            className="flex flex-col shadow-xl rounded-lg aspect-[4/5] w-2/12 p-2 items-center hover:shadow-sm border"
            onClick={() => {
                onPlayerMove(name)
            }}
        >
            <div className=" w-24 flex-1 align-middle relative">
                <img src={`../../src/assets/images/${image}`} className="absolute "></img>
                <img className="blur-md -z-10 absolute" src={`../../src/assets/images/${image}`}></img>
            </div>
            <div>{name}</div>
        </button>
    )
}

export default Card
