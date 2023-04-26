function Card({ image, name }) {
    return (
        <div className="flex flex-col shadow-xl rounded-lg aspect-[3/4] w-2/12 p-2 items-center hover:shadow-sm border">
            <div className=" w-24 flex-1 align-middle relative">
                <img src={`../../src/assets/images/${image}`} className="absolute "></img>
                <img className="blur-md -z-10 absolute" src={`../../src/assets/images/${image}`}></img>
            </div>
            <div>{name}</div>
        </div>
    )
}

export default Card
