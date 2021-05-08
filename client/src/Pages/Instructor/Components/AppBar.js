import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import logoImg from './../../../assets/navbar-2.png';
import AppBar from '@material-ui/core/AppBar';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/ButtonBase';


export default function appBar() {
  return (

    <AppBar position="relative">
      <Toolbar>
        <Grid container spacing={2} justify='space-between' alignItems='center'>
          <div>
            <Button raised style={{ borderRadius: 100,}} component={Link} to="../../Dashboard">
              <Grid container>
                <img src={logoImg} alt="logo" style={{ width: 40, marginRight: 10 }} />
                <Typography style={{ color: 'white', marginTop: 5 }}>
                  EXAMINATOR
                </Typography>
              </Grid>
            </Button>
          </div>
        </Grid>
      </Toolbar>
    </AppBar>


  )
};
