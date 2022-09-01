import React, { useState, useEffect } from 'react'
import '../App.css'
import axios from 'axios'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));
  
  const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;
  
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  };
  
  BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };


export default function PokeCard({ p }) {

    const { name, url } = p
    const pokeNum = url.split('/')[url.split('/').length - 2]
    const pokeImgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeNum}.png`
    const currentPokemon = `https://pokeapi.co/api/v2/pokemon-species/${pokeNum}/`
    const [open, setOpen] = useState(false);
    const [flavorText, setFlavorText] = useState("")

    useEffect(() => {
      let cancel
      axios
      .get(currentPokemon, {
        cancelToken: new axios.CancelToken(c => cancel = c)
      })
      .then(res => {
        setFlavorText(filterFlavorItems(res.data.flavor_text_entries, "en"))
      })
      return () => cancel()
    }, [open])

    const filterFlavorItems = (arr, lang) => {
      const newArr = arr.filter(elem => elem.language.name === lang)
      return newArr[0].flavor_text
    }

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const addDefaultSrc = e => e.target.src = '/not_avail.jpg'

    return (
      <>
        <Card
            className="pokecard"
            sx={{ backgroundColor: '#E8EAE3', display: 'flex', flexDirection: 'column', boxShadow: 1,
            borderRadius: 2 }}
        >
            <CardActionArea onClick={handleClickOpen}>
                <CardMedia
                  component="img"
                  image={pokeImgUrl}
                  onError={addDefaultSrc}
                  alt={name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2" class="pokename">#{pokeNum} {name}</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
            #{pokeNum} {name}
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <img
              style={{ maxWidth: "100%" }}
              src={pokeImgUrl}
              alt={name}
            />
            <Typography gutterBottom>
              {flavorText}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Exit
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </>
    )
}
 