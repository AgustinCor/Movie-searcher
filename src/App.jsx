
import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useState,useRef,useEffect } from 'react'

function useSearch () {
  const [search, updateSearch] =useState('')
  const [error, setError] =useState(null)
  const isFirstInput =useRef(true)

  useEffect(() =>{
    if(isFirstInput.current){
      isFirstInput.current =search === ''
      return
    }

    if(search === ''){
      setError("Can not search an empty movie")
      return
    }
  
    if (search.match(/^\d+$/)){
      setError('Can not search a movie with a number')
      return
    }
  
    if(search.length < 3){
      setError('The movie at least needs 3 characters')
      return
    }
  
    setError(null)
  },[search])

  return {search, updateSearch, error}
}

function App() {
  const {search,updateSearch,error} =useSearch()
  const {movies, loading, getMovies} =useMovies({search}) 


 const handleSubmit = (e) =>{ 
    e.preventDefault()
    getMovies()
   }
 
const handleChange =(e) =>{
  updateSearch(e.target.value)
}

  return (
    <div className="page">
      <header>
        <h1>Movie searcher</h1>
      <form className="form" onSubmit={handleSubmit}>
         <input style={{border:'1px solid transparent',borderColor:error ? "red" : 'transparent'}}
          onChange={handleChange} value={search} name='query' placeholder="Avengers, Star wars, The Matrix..." /> 
         <button type='submit'>Search</button>
      </form>
      {error && <p style ={{color: 'red'}}>{error}</p>}
      </header>
      <main>
        {
          loading ? <p>Cargando...</p> : <Movies movies={movies}/>
        }
      </main>  
    </div>
  )
}

export default App
