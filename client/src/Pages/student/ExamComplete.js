import React from 'react';
import AppBar from './Components/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';

import Submitted from '../../assets/Submitted.png';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function StudentExamComplete() {

    const classes = useStyles();

    return (


        <React.Fragment>
            <AppBar />
            <CssBaseline />
            
            <Container fixed>
                <Paper className={classes.paper}>
                <div className={classes.root}>
                    <Grid container spacing={3}>

                        <Grid item xs={6}>

                                <img src={Submitted} width="100" height="100" />

                            <Typography>
                                    Your Exam Have Been Submitted
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                                <Typography>
                                    Your Submission cannot be previewed at this Time
                            </Typography>
                        </Grid>
                    </Grid>
                    </div>
                    </Paper>
            </Container>
            
        </React.Fragment>
    )
};
