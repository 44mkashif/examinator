import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import logoImg from './../../../assets/navbar-2.png';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';

export default function appBar() {

    return (
        <AppBar position="relative">
            <Toolbar>
                <Grid container spacing={2} justify='space-between' alignItems='center'>
                    <div>
                        <Grid container>
                            <Button component={Link} to="/student/dashboard"> 
                                <img src={logoImg} alt="logo" style={{ width: 40, marginRight: 10 }} />
                                <Typography style={{ color: 'white' }}>
                                    Examinator
                                </Typography>
                            </Button>
                        </Grid>
                    </div>
                </Grid>
            </Toolbar>
        </AppBar>
    )
};
