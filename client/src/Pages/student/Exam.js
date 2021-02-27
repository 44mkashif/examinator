import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Question from './Components/Question';
import AppBar from './Components/AppBar';
import personImg from './../../assets/person.png'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    // padding: theme.spacing(2),
    //  textAlign: 'center',
    color: theme.palette.text.secondary,
    userSelect: 'none',
    // marginTop: '30px',
  },
  person: {
    width: "100%"
  }
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
        <Grid container spacing={0}>
          <Grid item xs={9}>
            {questions}
          </Grid>
          <Grid item justify="center" xs>
            <Paper className={classes.paper}>
              <img className={classes.person} src={personImg} alt="" />
            </Paper>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>

  );
}