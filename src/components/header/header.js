import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import logo from '../../assets/logo.png';
import imagebackground from '../../assets/image.png';
const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: 'flex-start',
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(2),
  // Override media queries injected by theme.mixins.toolbar
  '@media all': {
    minHeight: 128,
  },
}));
const CustomImg = styled('img')(({ theme }) => ({
maxWidth:"100px",}));
const CustomToolbar = styled(Toolbar)(({ theme }) => ({
  maxWidth:"auto",}));
  const CustomBox = styled(Box)(({ theme }) => ({
    opacity:"0.7",
  height:"25em",
  zIndex: -99999,
backgroundImage: `url(${imagebackground})`,

backgroundSize: "100% 130%",
}));
export default function ProminentAppBar() {
    return (
        <CustomBox sx={{
          zIndex: 'tooltip',}}>
          <AppBar position="static" color="transparent">
            <CustomToolbar>
            <Grid
        container
        spacing={4} justifyContent="center"
        alignItems="center">
        <Grid item xs={3} md={3}>
            <CustomImg src={logo} alt="logo" />
            </Grid>
            <Grid item xs={8} md={8}>
            <Stack direction="row" spacing={4}   justifyContent="center"

>
                          <Typography variant="h6" >
                Acceuil
              </Typography>
              <Typography variant="h6" >
                Nous situer
              </Typography>
              <Typography variant="h6" >
                Actualités
              </Typography>
              <Typography variant="h6" >
                Agenda
              </Typography>
              <Typography variant="h6" >
                Agenda
              </Typography>
              </Stack>
              </Grid>
              <Grid item xs={2} md={2}>
            <Stack direction="row" spacing={1}   justifyContent="center"

>
                          <Typography variant="h6" >
                Acceuil
              </Typography>
              <Typography variant="h6" >
                Nous situer
              </Typography>

              </Stack>
              </Grid>
              </Grid>
            </CustomToolbar>
          </AppBar>
        </CustomBox>

    );
}    