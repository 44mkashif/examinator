import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import logoImg from './../../../assets/navbar-2.png';
import AppBar from '@material-ui/core/AppBar';


export default function appBar(){
    return(
    <AppBar position="relative">
       <Toolbar>
        <Grid container spacing={2} justify='space-between' alignItems='center'>
            <div>
              <Grid container>
                <img src={logoImg} alt="logo" style={{width: 40, marginRight: 10}} />
                <Typography style={{ color: 'white'}}>
                  Examinator
                </Typography>
              </Grid>
            </div>
      </Grid>
      </Toolbar>
    </AppBar>
    )
};
