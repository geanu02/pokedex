import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useState, useEffect } from 'react'
import PokeList from './Components/PokeList'
import PageControl from "./Components/PageControl"
import axios from 'axios'
import './App.css'

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://geanu.netlify.app/">
        Gian Carlo Torres
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function App2() {
    const [pokemon, setPokemon] = useState(["Bulbasaur", "Charmander"])
    const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon")
    const [loading, setLoading] = useState(true)
    const [postsPerPage, setPostsPerPage] = useState(20)
    const [prevPageUrl, setPrevPageUrl] = useState()
    const [nextPageUrl, setNextPageUrl] = useState()
    const [totalPosts, setTotalPosts] = useState(0)
  
    useEffect(() => { 
      setLoading(true)
      let cancel
      axios
      .get(currentPageUrl, {
        cancelToken: new axios.CancelToken(c => cancel = c)
      })
      .then(res => {
        setLoading(false)
        setTotalPosts(res.data.count)
        setNextPageUrl(res.data.next)
        setPrevPageUrl(res.data.previous)
        setPokemon(res.data.results.map(p => p))
      })
      return () => cancel()
    }, [currentPageUrl])

    // Pagination

    const gotoNextPage = () => setCurrentPageUrl(nextPageUrl)
    const gotoPrevPage = () => setCurrentPageUrl(prevPageUrl)

    // Change Page

    const paginate = (pageNumber, itemsPerPage) => {
      let offset = (pageNumber - 1) * itemsPerPage
      // setCurrentPage(pageNumber) <- START HERE
      setPostsPerPage(itemsPerPage)
      setCurrentPageUrl(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${itemsPerPage}`)
    }

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="relative">
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              Project
            </Typography>
          </Toolbar>
        </AppBar>
        <main>
          
          <Box
            sx={{
              bgcolor: 'background.paper',
              pt: 8,
              pb: 6,
            }}
          >
            <Container maxWidth="sm">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
              >
                PokéDex
              </Typography>
              <Typography variant="h5" align="center" color="text.secondary" paragraph>
                Discover Pokémon in a new perspective
              </Typography>
              <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
              >
                  <PageControl
                      gotoNextPage={nextPageUrl ? gotoNextPage : null}
                      gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
                      postsPerPage={postsPerPage}
                      totalPosts={totalPosts}
                      paginate={paginate}
                  />
              </Stack>
            </Container>
          </Box>

          <Container sx={{ py: 8 }} maxWidth="lg">
            <Grid container>
              <PokeList pokemon={pokemon} loading={loading} />
            </Grid>
          </Container>

          <Box>
              <Container>
                  <Stack
                  sx={{ pt: 4 }}
                  direction="row"
                  spacing={2}
                  justifyContent="center"
                  >
                      <PageControl
                        gotoNextPage={nextPageUrl ? gotoNextPage : null}
                        gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
                        postsPerPage={postsPerPage}
                        totalPosts={totalPosts}
                        paginate={paginate}
                      />
                  </Stack>
              </Container>
          </Box>

        </main>

        {/* Footer */}
        <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
          <Typography variant="h6" align="center" gutterBottom>
            A Project by Gian Carlo Torres
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            component="p"
          >
            React.js, MaterialUI and Web APIs
          </Typography>
          <Copyright />
        </Box>
        {/* End footer */}
      </ThemeProvider>
    );
}