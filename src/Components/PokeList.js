import React from 'react'
import PokeCard from './PokeCard'
import '../App.css'

import Grid from '@mui/material/Grid';

export default function PokeList({ pokemon }) {
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
