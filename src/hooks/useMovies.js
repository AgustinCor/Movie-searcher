import withResults from '../mocks/with-results.json'
import withoutResults from '../mocks/no-results.json'
import { useState } from 'react'
import { searchMovies } from '../services/movies'

export function useMovies ({search}) {
    const [movies, setMovies] =useState([])
    const [loading, setLoading] =useState(false)
    const [error,setError]= useState(null)

    const getMovies = async () =>{
    try{
      setLoading(true)
      setError(null)
      const newMovies =await searchMovies({search})
      setMovies(newMovies)
    }catch(e){
      setError(e.message)
    }finally{
      setLoading(false)
    }

    }
  
    return {movies, getMovies, loading}
  }