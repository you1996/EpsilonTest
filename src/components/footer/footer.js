import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import logo from '../../assets/logo.png';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: 'flex-start',
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(2),
  // Override media queries injected by theme.mixins.toolbar
  '@media all': {
    minHeight: 128,
  },
}));

export default function Footer() {
    return (
        <Box sx={{ flexGrow: 1 }}>
          <footer>
            <Toolbar>
              <img src={logo} alt="logo" />
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                La MMIE
              </Typography>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Légal
              </Typography>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Contact
              </Typography>
              icons
            </Toolbar>
          </footer>
        </Box>
    );
}    