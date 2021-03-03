import React from 'react';
import AppBar from './Components/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

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
                <div className={classes.root}>
                    <Grid container spacing={3}>

                        <Grid item xs={6}>
                            <Paper className={classes.paper}>You have attempted 4 out of 5 Questions</Paper>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <Paper className={classes.paper}>You scored 8 out of 10</Paper>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </React.Fragment>
    )
};
