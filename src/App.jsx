
import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useState } from 'react'
import { useEffect } from 'react'

function App() {
 const {movies} =useMovies() 
const [query, setQuery] =useState('')
const [error, setError] =useState(null)

 const handleSubmit = (e) =>{ 
    e.preventDefault()
    console.log({query})
   }
 
const handleChange =(e) =>{
  const newQuery=e.target.value
  if(newQuery.startsWith(' ')) return
  setQuery(e.target.value)
}

useEffect(() =>{
  if(query === ''){
    setError("Can not search an empty movie")
    return
  }

  if (query.match(/^\d+$/)){
    setError('Can not search a movie with a number')
    return
  }

  if(query.length < 3){
    setError('The movie at least needs 3 characters')
    return
  }

  setError(null)
},[query])

  return (
    <div className="page">
      <header>
        <h1>Movie searcher</h1>
      <form className="form" onSubmit={handleSubmit}>
         <input onChange={handleChange} value={query} name='query' placeholder="Avengers, Star wars, The Matrix..." /> 
         <button type='submit'>Search</button>
      </form>
      {error && <p style ={{color: 'red'}}>{error}</p>}
      </header>
      <main>
        <Movies movies={movies}/>
      </main>  
    </div>
  )
}

export default App
