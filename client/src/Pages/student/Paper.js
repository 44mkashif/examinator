import AppBar from './Components/AppBar'; 
import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import Grid from '@material-ui/core/Grid';

import Question from './Components/Question';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    text: {
        userSelect: 'none'
    }
}));

var questions = [1, 2, 3, 4];

var questionNum = 5;

export default function SimplePaper() {
    const classes = useStyles();

    var questions = [];
    for (var i = 0; i < questionNum; i++) {
        questions.push(<Question />);
    }


    return (
        <React.Fragment>
            <AppBar/>
            <div className={classes.root}>
                <Grid container spacing={3} justify="center">
                    <Grid item xs={8}>
                            {questions}
                    </Grid>
                </Grid>
            </div>
            
        </React.Fragment>
        
    );
}