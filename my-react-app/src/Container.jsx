import {useEffect, useState, useRef} from 'react'


const namesArray = [
    "Ольга",
    "Дмитрий",
    "Елена",
    "Александр",
    "Светлана",
    "Михаил",
    "Татьяна",
    "Сергей",
    "Марина",
    "Андрей"
];

function getRandomName(){
    if (!namesArray || namesArray.length < 1) {
        return "неизвестный пользователь";
    }
    const randomIndex = Math.floor(Math.random() * namesArray.length);
    return namesArray[randomIndex];
}

function Header() {
    return (
        <>
            <h1>Это мой первый React. проект!</h1>
        </>
    )
}

function Greeting(props) {
    const {name} = props;
    const prevUserRef = useRef()
    const prevUserName = prevUserRef.current
    const isUserNameChanged = prevUserName !== undefined && prevUserName !== name
    useEffect(() => {
        prevUserRef.current = name
    }, [name]);
    const message = isUserNameChanged
        ? `Привет, у тебя поменялось имя, теперь ты  ${name}!`
        : `Привет, ${name}!`

    return (
        <>
            <p>{message}</p>
        </>
    )
}

function Clock() {
    const [date, setDate] = useState(() => new Date());

    useEffect(() => {
        const timerId = setInterval(() => {
            setDate(new Date())
        }, 1000)

        return () => clearInterval(timerId);
    }, [])

    function setMessage(value){
        return (
            <p>
                { value % 5 === 0 ? "Время делится на 5" : ""}
            </p>
        )
    }

    const minutes = date.getMinutes()
    const seconds = date.getSeconds()
    const minutesMessage = setMessage(minutes)
    const secondsMessage = setMessage(seconds)

    return (
        <>
            <p>Текущее время: {date.toLocaleTimeString()}</p>
            {minutesMessage}
            {secondsMessage}
        </>
    )
}

function Container() {
    const [userName, setUserName] = useState(() => getRandomName());

    useEffect(() => {
        const timeId = setInterval(() => {
            const newName = getRandomName();
            setUserName(newName);
            console.log("Установлено новое имя:", newName);
        }, 10000)

        return () => {
            clearInterval(timeId);
        }
    }, [])

    return (
        <>
            <div className='container'>
                <Header/>
                <p>Текущее имя: {userName}</p>
                <Greeting name={userName}/>
                <Clock/>
            </div>
        </>
    )
}

export default Container