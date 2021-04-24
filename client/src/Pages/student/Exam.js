import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import logoImg from './../../assets/navbar-2.png';
import Grid from '@material-ui/core/Grid';
import Question from './Components/Question';
import AppBar from '@material-ui/core/AppBar';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Timer from './Components/Timer';
import io from 'socket.io-client';
import Typography from '@material-ui/core/Typography';
import { useHistory, useParams } from 'react-router-dom';
import Footer from '../Components/Footer';

import Box from '@material-ui/core/Box';
import { Alert, AlertTitle } from '@material-ui/lab';

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
    width: "150px",

  }, 
  video: {
    borderStyle: "solid",
    borderColor: theme.palette.primary.main,
  },
  rvideo: {
    
    borderStyle: "solid",
    borderColor: theme.palette.secondary.main,
  }
}));

var questionNum = 5;

var ques = ["A linear collection of data elements where the linear node is given by means of pointer is called?",
  "In linked list each node contains a minimum of two fields. One field is data field to store the data second field is?",
  "What would be the asymptotic time complexity to add a node at the end of singly linked list, if the pointer is initially pointing to the head of the list?",
  "The concatenation of two lists can be performed in O(1) time. Which of the following variation of the linked list can be used?",
  "What would be the asymptotic time complexity to insert an element at the front of the linked list (head is known)"];

var questions = [];
for (var i = 0; i < questionNum; i++) {
  questions.push(<Question question={"Question " + i + ": " + ques[i]} qNo={i} />);
}
var temp = 0;

var isAnswered = false;
var localStream;
var remoteStream;
var examRoom;
var peerConnection;

const socket = io("http://127.0.0.1:4001");

window.onbeforeunload = () => {
  socket.emit('message', 'close', examRoom);
};



export default function AutoGrid() {

  const videoRef = React.useRef(null);
  const remoteVideoRef = React.useRef(null);
  examRoom = useParams().exam;

  React.useEffect(() => {

    const socket = io("http://127.0.0.1:4001");
    var videoDivision = document.querySelector('.videos');

    window.onfocus = () => {
      socket.emit('message', { type: 'focus' }, examRoom);
    };

    window.onblur = () => {
      socket.emit('message', { type: 'blur', name: localStorage.getItem('studentName') }, examRoom);
    };

    if (examRoom != '') {
      socket.emit('join', examRoom);
    }

    socket.on('message', (message) => {
      if (message.type == 'offer' && !isAnswered) {
        console.log('student getting offer');
        peerConnection.setRemoteDescription(new RTCSessionDescription(message));
        doAnswer();
      } else if (message.type == 'candidate') {
        console.log('student getting candidate info');
        let candidate = new RTCIceCandidate({
          sdpMLineIndex: message.label,
          candidate: message.candidate
        });
        peerConnection.addIceCandidate(candidate);
      } else if (message == 'close') {
        handleRemoteHangup();
      } else if (message.type == 'on/off') {
        if (message.toggleState.checked) {
          console.log('retain')
          document.getElementById('remoteVideo').hidden = false;
        } else {
          console.log('remove')
          document.getElementById('remoteVideo').hidden = true;
        }
      }
    })

    navigator.mediaDevices.getUserMedia({
      audio: false,
      video: true
    }).then((stream) => {
      let localVideo = videoRef.current;
      localVideo.srcObject = stream;
      localStream = stream;
      localVideo.play();
      console.log('Local Video Streaming....')

      createPeerConnection();
      socket.emit('message', 'got stream', examRoom);

    }).catch((error) => {
      console.log(error)
    })

    window.onbeforeunload = function () {
      socket.emit('message', 'close', examRoom);
    }

    function createPeerConnection() {
      try {
        console.log('student creting peer connection');
        peerConnection = new RTCPeerConnection(null);
        peerConnection.onicecandidate = handleIceCandidate;
        peerConnection.onaddstream = handleRemoteStreamAdded;
        peerConnection.onremovestream = handleRemoteStreamRemoved;
        peerConnection.addStream(localStream);
      } catch (error) {
        console.log(error);
        return;
      }
    }

    function handleIceCandidate(e) {
      console.log('student sending candidate info');
      if (e.candidate) {
        let message = {
          type: 'candidate',
          label: e.candidate.sdpMLineIndex,
          id: e.candidate.sdpMid,
          candidate: e.candidate.candidate
        };
        socket.emit('message', message, examRoom);
      }
    }

    function handleRemoteStreamAdded(e) {
      console.log('student stream received')
      let remoteVideo = remoteVideoRef.current;
      remoteVideo.srcObject = e.stream;
      remoteVideo.play();

      // remoteStream = e.stream;
      // let remoteVideo = document.createElement('video');
      // remoteVideo.srcObject = remoteStream;
      // remoteVideo.autoplay = true;
      // remoteVideo.width = 250;
      // videoDivision.appendChild(remoteVideo);
    }


    function handleRemoteStreamRemoved(e) {

    }

    function doAnswer() {
      console.log('student answering to offer');
      peerConnection.createAnswer().then((sessionDescription) => {
        peerConnection.setLocalDescription(sessionDescription);
        isAnswered = true;
        socket.emit('message', sessionDescription, examRoom);
      }, (error) => {
        console.log(error);
      })
    }

    function hangup() {
      console.log('Hanging up.');
    }

    function handleRemoteHangup() {
      console.log('Session terminated.');
      stop();
    }

    function stop() {
      peerConnection.close();
      peerConnection = null;
    }



  }, []);

  const classes = useStyles();
  const [qNo, setQNo] = React.useState('');
  const [activebutton, setButton] = React.useState(true);

  const history = useHistory();
  const navigateTo = (path) => history.push(path);


  const handleChange = () => {
    // currentQues.pop();
    console.log(questions);

    if (qNo >= questions.length - 1 || qNo === undefined) {
      setButton(false);
    }

    console.log(temp);
    setQNo(++temp);
  };


  return (
    <React.Fragment>
      <AppBar position="relative">
        <Toolbar>
          <Grid container spacing={2} justify='space-between' alignItems='center'>
            <div>
              <Grid container>
                <img src={logoImg} alt="logo" style={{ width: 40, marginRight: 10 }} />
                <Typography style={{ color: 'white', marginTop: 5 }}>
                  EXAMINATOR
                </Typography>
              </Grid>
            </div>
          </Grid>
        </Toolbar>
      </AppBar>

      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={9} style={{ paddingTop: 40 }} >
            <Timer />
            {questions[qNo ? qNo : 0]}

            <Box mt={5} hidden={activebutton}>
              <Alert severity="success">
                <AlertTitle>Thank You</AlertTitle>
                  Your Exam is Finished. Press Submit to Proceed.
                </Alert>
            </Box>

            <Grid container spacing={2} justify="center" style={{ paddingTop: 40 }}>
              <Grid item>
                <Button variant="contained" color="primary" className={classes.button} onClick={handleChange} disabled={!activebutton} >
                  Save &amp; Next
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="secondary" className={classes.button}
                  disabled={activebutton} onClick={event => { navigateTo(`../ExamComplete/${examRoom}`) }}>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid container justify="right" xs style={{ paddingTop: 40 }}>
            <div className="videos">
              <video className={classes.video} width="350" ref={videoRef}></video>

              <video id="remoteVideo" className={classes.rvideo} width="350" ref={remoteVideoRef}>
              </video>

            </div>
          </Grid>
        </Grid>
      </div>
      {/* Footer */}
      <Footer />
      {/* End footer */}
    </React.Fragment>

  );
}