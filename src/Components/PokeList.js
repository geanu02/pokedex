import React from 'react'
import PokeCard from './PokeCard'
import '../App.css'

import Grid from '@mui/material/Grid';

export default function PokeList({ pokemon, loading }) {
  if (loading) {
    return <h2>Loading...</h2>
  }
  
  return (
    <div className="pokelist">
        {pokemon.map(p => (
          <Grid item key={p} xs={4} md={4}>
            <PokeCard p={p} />
          </Grid>
        ))}
    </div>
  )
}
