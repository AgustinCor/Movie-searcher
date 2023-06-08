import './App.css'
import responseMovies from './mocks/with-results.json'
import withoutResults from './mocks/no-results.json'
import { Movies } from './components/Movies'


function App() {
  const movies =responseMovies.Search

  const mappedMovies =movies?.map(movie => ({
    id:movie.imdbID,
    title:movie.Title,
    year:movie.Year,
    poster:movie.Poster
  }))

  return (
    <div className="page">
      <header>
        <h1>Movie searcher</h1>
      <form className="form">
         <input placeholder="Avengers, Star wars, The Matrix..." />
         <button type='submit'>Search</button>
      </form>
      </header>
      <main>
        <Movies movies={mappedMovies}/>
      </main>  
    </div>
  )
}

export default App
