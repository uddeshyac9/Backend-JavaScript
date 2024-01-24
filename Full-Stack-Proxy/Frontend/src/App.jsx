import { useEffect, useState } from 'react'

import './App.css'
import axios from 'axios';

function App() { 
  const [jokes, setJokes] = useState([])
  useEffect(() => {
    axios.get('/api/jokes')
    .then((responce) => {
     setJokes(responce.data)
    }).catch((error)=> {
      console.log(error);
    })
  },[])


  return (
    <>
   <h1>We created a Api and connect frontend with backend </h1>
   <p>Jokes: {jokes.length}</p>
   {
    jokes.map((joke) => {
      return <div key={joke.id} joke ={joke}>
        <h2>{joke.title}</h2>
        <p>{joke.joke}</p>
      </div>
    })
   }
    </>
  )
}

export default App
