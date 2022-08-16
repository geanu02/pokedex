import React, { useState, useEffect } from "react"
import PokeList from "./Components/PokeList"
import Pagination from "./Components/Pagination"
import axios from "axios"
import './App.css'

function App() {
  const [pokemon, setPokemon] = useState(["Bulbasaur", "Charmander"])
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon")
  const [prevPageUrl, setPrevPageUrl] = useState()
  const [nextPageUrl, setNextPageUrl] = useState()
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    setLoading(true)
    let cancel
    axios
    .get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    })
    .then(res => {
      setLoading(false)
      setNextPageUrl(res.data.next)
      setPrevPageUrl(res.data.previous)
      setPokemon(res.data.results.map(p => p))
    })
    return () => cancel()
  }, [currentPageUrl])

  const gotoNextPage = () => {
    setCurrentPageUrl(nextPageUrl)
  }

  const gotoPrevPage = () => {
    setCurrentPageUrl(prevPageUrl)
  }
  
  const itemsFive = () => {
    setCurrentPageUrl("https://pokeapi.co/api/v2/pokemon?offset=0&limit=5")
  }

  const itemsTen = () => {
    setCurrentPageUrl("https://pokeapi.co/api/v2/pokemon?offset=0&limit=10")
  }

  const itemsFifty = () => {
    setCurrentPageUrl("https://pokeapi.co/api/v2/pokemon?offset=0&limit=50")
  }

  if (loading) return "Loading..."

  return (
    <>
      <PokeList pokemon={pokemon} />
      <Pagination
        gotoNextPage={nextPageUrl ? gotoNextPage : null}
        gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
        itemsFive={itemsFive}
        itemsTen={itemsTen}
        itemsFifty={itemsFifty}
      />
    </>
  )
}

export default App