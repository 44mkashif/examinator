import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Question from './Components/Question';

import AppBar from './Components/AppBar';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    //  textAlign: 'center',
    color: theme.palette.text.secondary,
    userSelect: 'none',
    marginTop: '30px'
  },

}));

var questionNum = 5;

export default function AutoGrid() {
  const classes = useStyles();

  var questions = [];
  for (var i = 0; i < questionNum; i++) {
    questions.push(<Question />);
  }

  return (
    <React.Fragment>
      <AppBar />
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={9}>
            {questions}
          </Grid>
          <Grid item xs>
            <Paper className={classes.paper}>xs</Paper>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>

  );
}