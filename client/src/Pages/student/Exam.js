import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Question from './Components/Question';
import AppBar from './Components/AppBar';
import personImg from './../../assets/person.png';
import Button from '@material-ui/core/Button';
import Timer from './Components/Timer';
import io from 'socket.io-client';
<script src="https://webrtc.github.io/adapter/adapter-latest.js"></script>


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

  const videoRef = React.useRef(null);

  React.useEffect(()=>{

    const socket = io("http://127.0.0.1:4001");

    navigator.mediaDevices.getUserMedia({
      audio: false,
      video: true
    }).then((stream)=>{
      let loaclVideo = videoRef.current;
      loaclVideo.srcObject = stream;
      loaclVideo.play();
      console.log('Local Video Streaming....')
    })

  }, []);

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
      <Timer/>
      <div className={classes.root}>
        <Grid container spacing={0}>
          <Grid item xs={9} style={{paddingTop: 40}} >
            {questions[qNo ? qNo : 0]}
            <Grid container justify="center" style={{paddingTop: 40}}>
              <Button variant="contained" color="primary" className={classes.button} onClick={handleChange}>
              Save &amp; Next
            </Button>
            </Grid> 
          </Grid>
          <Grid container justify="center" xs>
            <video width="250" ref={videoRef}></video>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>

  );
}