import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Question from './Components/Question';
import AppBar from './Components/AppBar';
import personImg from './../../assets/person.png';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    // padding: theme.spacing(2),
    //  textAlign: 'center',
    color: theme.palette.text.secondary,
    // marginTop: '30px',
  },
  person: {
    width: "100%"
  },
  button: {
    borderRadius: 100,
  }
}));

var questionNum = 5;

var questions = [];
for (var i = 0; i < questionNum; i++) {
  questions.push(<Question question={"Question " + i} qNo={i} />);
}
var temp = 0;
export default function AutoGrid() {
  const classes = useStyles();
  const [qNo, setQNo] = React.useState('');

  const handleChange = () => {
    // currentQues.pop();
    console.log(questions);
    console.log(temp);
    setQNo(++temp);
  };

  return (
    <React.Fragment>
      <AppBar />
      <div className={classes.root}>
        <Grid container spacing={0}>
          <Grid item xs={9} justify="center" alignItems="center">
            {questions[qNo ? qNo : 0]}
            <Button variant="contained" color="primary" className={classes.button} onClick={handleChange}>
              Save &amp; Next
            </Button>
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