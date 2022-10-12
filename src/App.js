import React, { useEffect, useState } from 'react';
import './main.scss'
import { useDispatch, useSelector } from 'react-redux';
import { change, up, setList, getData } from './store'; // 1.재료를 불러옴
//https://duckgugong.tistory.com/323

const Movie = () => {
    const movieSet = useDispatch();
    const { movieData } = useSelector(s => s)
    useEffect(() => {
        movieSet(getData())
    }, [])
    return (
        <div>
            {console.log(movieData)}
        </div>
    )
}

const Form = () => {
    const [input, setInput] = useState({})
    const inputHandler = e => {
        const { name, value } = e.target;
        setInput({
            [name]: value
        });
        console.log(input)
    }

    const listUp = useDispatch();

    return (
        <>
            <input name='name' value={input.name} onChange={inputHandler} />
            <button onClick={() => listUp(setList(input))}>UP</button>
        </>
    )
}
const List = () => {
    const { arryIncreace } = useSelector(s => s)
    return (
        <ul>
            <Form />
            {
                arryIncreace.map((it, idx) => {
                    return (
                        <li>{it.name}</li>
                    )
                })
            }
        </ul>
    )
}


const TheDeepSub = () => {
    const set = useDispatch()

    return (
        <div>
            <List />
            <button onClick={() => set(change())}>MODE</button>
            <button onClick={() => set(up(1))}>+</button>
            <button onClick={() => set(up(-1))}>-</button>
        </div>
    )
}

const DeepSub = () => {
    return <TheDeepSub />
}
const Sub = () => {
    return <DeepSub />
}
const App = () => {
    const { mode, numChange } = useSelector(it => it);
    console.log(mode)
    return (
        <div className={`main ${mode ? "on" : ""}`}>
            <Movie />
            <Sub />
            {numChange}
            <div>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae harum blanditiis tempora deserunt sint quasi dolorem voluptatem soluta quas cum!</div>
        </div>
    )

}

export default App