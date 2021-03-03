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
import { useHistory } from 'react-router-dom';
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

var ques = [ "A linear collection of data elements where the linear node is given by means of pointer is called?",
 "In linked list each node contains a minimum of two fields. One field is data field to store the data second field is?",
  "What would be the asymptotic time complexity to add a node at the end of singly linked list, if the pointer is initially pointing to the head of the list?",
   "The concatenation of two lists can be performed in O(1) time. Which of the following variation of the linked list can be used?",
    "What would be the asymptotic time complexity to insert an element at the front of the linked list (head is known)" ];

var questions = [];
for (var i = 0; i < questionNum; i++) {
  questions.push(<Question question={"Question " + i + ": " + ques[i]} qNo={i} />);
}
var temp = 0;
var isCreator = false;
var isAnswered = false;
var localStream;
var remoteStream;
var examRoom = 'foo';
var peerConnection;

export default function AutoGrid() {

  const videoRef = React.useRef(null);

  React.useEffect(()=>{

    const socket = io("http://127.0.0.1:4001");
    var videoDivision = document.querySelector('.videos');
    
    if(examRoom != '') {
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
      }
    })

    navigator.mediaDevices.getUserMedia({
      audio: false,
      video: true
    }).then((stream)=>{
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

    function handleIceCandidate (e) {
      console.log('student sending candidate info');
      if(e.candidate) {
        let message = {
          type: 'candidate',
          label: e.candidate.sdpMLineIndex,
          id: e.candidate.sdpMid,
          candidate: e.candidate.candidate
        };
        socket.emit('message', message, examRoom);
      }
    }

    function handleRemoteStreamAdded (e) {
      console.log('student stream received')
      remoteStream = e.stream;
      let remoteVideo = document.createElement('video');
      remoteVideo.srcObject = remoteStream;
      remoteVideo.autoplay = true;
      remoteVideo.width = 250;
      videoDivision.appendChild(remoteVideo);
    }

    function handleRemoteStreamRemoved (e) {
      
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

  }, []);

  const classes = useStyles();
  const [qNo, setQNo] = React.useState('');
  const [activebutton, setButton] = React.useState(true);

  const history = useHistory();
  const navigateTo = (path) => history.push(path);


  const handleChange = () => {
    // currentQues.pop();
    console.log(questions);

    if (qNo >= questions.length-1 || qNo === undefined) {
      setButton(false);
    }
    console.log(temp);
    setQNo(++temp);
  };



  return (
    <React.Fragment>
      <AppBar />
      
      <div className={classes.root}>
        
        <Grid container spacing={0}>
          
          <Grid item xs={9} style={{paddingTop: 40}} >
            <Timer />
            {questions[qNo ? qNo : 0]}
            <Grid container justify="center" style={{paddingTop: 40}}>
              <Button variant="contained" color="primary" className={classes.button} onClick={handleChange} >
              Save &amp; Next
            </Button>
              <Button variant="contained" disabled={activebutton} onClick={event => { navigateTo('./ExamComplete') }}>
                Submit
               </Button>
            </Grid> 
          </Grid>
          <Grid container justify="center" xs>
            <div className="videos">
              <video width="250" ref={videoRef}></video>
            </div>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>

  );
}