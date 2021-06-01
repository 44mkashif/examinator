import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';
import Switch from '@material-ui/core/Switch';
import logoImg from './../../assets/navbar-2.png';
import Toolbar from '@material-ui/core/Toolbar';
import { Alert, AlertTitle } from '@material-ui/lab';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Footer from '../Components/Footer';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';
import Timer from './Components/Timer';
import ExamService from '../../services/ExamService';
import theme from './../../theme';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import ClassificationService from '../../services/ClassificationService';

<script src="https://webrtc.github.io/adapter/adapter-latest.js"></script>

var isCreator = false;
var localStream;
var remoteStream;
var examRoom;
var peerConnections = {};
var remoteId;


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },

  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {

    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 0.05,
    padding: theme.spacing(1),
  },
  video: {
    borderStyle: "solid",
    borderColor: theme.palette.primary.main
  },
  vid1: {
    borderStyle: "solid",
    borderColor: "green"
  },
  vid2: {
    borderStyle: "solid",
    borderColor: "#17a2b8"
  },
  vid3: {
    borderStyle: "solid",
    borderColor: "yellow"
  },
  vid4: {
    borderStyle: "solid",
    borderColor: "orange"
  },
  vid5: {
    borderStyle: "solid",
    borderColor: "red"
  },
  lvl1: {
    backgroundColor: "#b3ffcc"
  },
  lvl2: {
    backgroundColor: "#bbeff7",
  },
  lvl3: {
    backgroundColor: "#ffff80",
  },
  lvl4: {
    backgroundColor: "#ffc299",
  },
  lvl5: {
    backgroundColor: "#ff9999",
  },
  loader: {
    display: 'flex',
  }
}));

var exam;

export default function Exam() {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [students, setStudents] = React.useState([]);

  examRoom = useParams().exam;
  const videoRef = React.useRef(null);
  const [msg, setmsg] = React.useState('');
  const [img, setimg] = React.useState(null);
  const [toggleState, settoggleState] = React.useState({
    checked: true,
  });
  // const [examName, setExamName] = React.useState("");
  // const [examDuration, setExamDuration] = React.useState(0);
  // const [examStartTime, setExamStartTime] = React.useState(0);

  React.useEffect(() => {
    const socket = io("http://127.0.0.1:4001");
    socket.emit('on/off stream', { type: 'on/off', toggleState: toggleState }, examRoom);

    ExamService.getExam(examRoom, authToken, true).then((examFromDb) => {
      exam = examFromDb[0];
      console.log("Exam from db: ", exam);
      if (exam) {
        ExamService.updateHallCreated(exam._id, authToken).then(res => {
          console.log(res);
          setLoading(true);
        });
      }

    });
  }, [toggleState])

  const classifyImage = async (streamImage, studentID) => {
    console.log("Captured Image: ", streamImage);
    var data = new FormData();
    data.append('frame', streamImage, streamImage.name);
    data.append('studentID', studentID)

    const classification = await ClassificationService.classifyImage(data);

    console.log(classification);
  }
  const authToken = localStorage.getItem('auth-token');

  React.useEffect(() => {
    const socket = io("http://127.0.0.1:4001");
    var videoDivision = document.querySelector('#videos');

    if (examRoom !== '') {
      socket.emit('create', examRoom);
    }

    socket.on('message', (message, remoteClientId) => {
      if (message === 'got stream' && isCreator) {
        console.log('instructor getting client signal');
        createPeerConnection(remoteClientId);
        doCall(remoteClientId);
      } else if (message.type === 'answer' && isCreator) {
        peerConnections[remoteClientId].setRemoteDescription(new RTCSessionDescription(message));
        remoteId = remoteClientId;
      } else if (message.type === 'candidate') {
        console.log('instructor getting candidate info');
        let candidate = new RTCIceCandidate({
          sdpMLineIndex: message.label,
          candidate: message.candidate
        });
        peerConnections[remoteClientId].addIceCandidate(candidate);
      } else if (message.type === 'close') {
        console.log('remote stream closed...');
        handleRemoteHangup(remoteClientId);
        students.filter((student) => {
          console.log(student);
          return student.studentId !== message.studentId;
        });
        setStudents(students => [...students]);
        console.log(students)
      } else if (message.type === 'blur') {
        setmsg(message.name + ' has changed tab');
      } else if (message.type === 'focus') {
        setmsg('');
      } else if (message.type === 'classification') {
        console.log("Message", message);
        const maxIndex = indexOfMax(message.classification);
        const element = document.getElementById(remoteClientId);

        if (element.classList.contains(classes.vid1)) {
          element.classList.remove(classes.vid1);
        }
        if (element.classList.contains(classes.vid2)) {
          element.classList.remove(classes.vid2);
        }
        if (element.classList.contains(classes.vid3)) {
          element.classList.remove(classes.vid3);
        }
        if (element.classList.contains(classes.vid4)) {
          element.classList.remove(classes.vid4);
        }
        if (element.classList.contains(classes.vid5)) {
          element.classList.remove(classes.vid5);
        }

        switch (maxIndex) {
          case 0:
            element.classList.add(classes.vid1);
            break;

          case 1:
            element.classList.add(classes.vid2);
            break;

          case 2:
            element.classList.add(classes.vid3);
            break;

          case 3:
            element.classList.add(classes.vid4);
            break;

          case 4:
            element.classList.add(classes.vid5);
            break;

          default:
            break;
        }

      } else if (message.type === 'Student Info') {
        console.log("Student Info", message);
        const student = {
          studentId: message.studentId,
          studentName: message.studentName,
          studentRegNo: message.studentRegNo
        }
        setStudents(students => [...students, student]);
        console.log("Students: ", students);
      }

    })

    socket.on('created', () => {
      isCreator = true;
      console.log('room created!')
    })
    console.log(videoDivision)
    navigator.mediaDevices.getUserMedia({
      audio: false,
      video: true
    }).then((stream) => {
      let localVideo = videoRef.current;
      localVideo.srcObject = stream;
      // const track = stream.getVideoTracks()[0];
      // console.log("Local track: ", track);
      // let imageCapture = new ImageCapture(track);

      // imageCapture.takePhoto().then(imageBitmap => {
      //   console.log("Local image: ", imageBitmap);
      //   classifyImage(imageBitmap, 'studentID')
      // }).catch(error => {
      //   console.log(error);
      // });

      localStream = stream;
      localVideo.play();
      console.log('Local Video Streaming....')

      // socket.emit('message', 'got stream', examRoom)
    })

    function indexOfMax(arr) {
      if (arr.length === 0) {
        return -1;
      }

      var max = arr[0];
      var maxIndex = 0;

      for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
          maxIndex = i;
          max = arr[i];
        }
      }

      return maxIndex;
    }

    function createPeerConnection(remoteClientId) {
      try {
        console.log('instructor creating peer connection');
        peerConnections[remoteClientId] = new RTCPeerConnection(null);
        peerConnections[remoteClientId].onicecandidate = handleIceCandidate;
        peerConnections[remoteClientId].onaddstream = handleRemoteStreamAdded;
        peerConnections[remoteClientId].onremovestream = handleRemoteStreamRemoved;
        peerConnections[remoteClientId].addStream(localStream);
      } catch (error) {
        console.log(error);
        return;
      }
    }

    function handleIceCandidate(e) {
      console.log('instructor sending candidate info');
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
      console.log('stream received')
      remoteStream = e.stream;

      // const track = remoteStream.getVideoTracks()[0];
      // console.log("Remote track: ", track);

      // let imageCapture = new ImageCapture(track);
      // console.log("Remote image capture: ", imageCapture);

      // imageCapture.takePhoto()
      //   .then(blob => createImageBitmap(blob))
      //   .then(imageBitmap => {
      //     console.log("Remote image: ", imageBitmap);
      //   })

      let remoteVideo = document.createElement('video');
      remoteVideo.srcObject = remoteStream;
      remoteVideo.autoplay = true;
      remoteVideo.id = remoteId;
      remoteVideo.width = 250;
      remoteVideo.className = classes.video;
      videoDivision.appendChild(remoteVideo);
    }
    function handleRemoteStreamRemoved(e) {
      console.log(e);
      console.log("student removed");
    }

    function doCall(remoteClientId) {
      console.log('instructor sending offer');
      peerConnections[remoteClientId].createOffer((sessionDescription) => {
        peerConnections[remoteClientId].setLocalDescription(sessionDescription);
        socket.emit('message', sessionDescription, examRoom)
      }, (error) => {
        console.log(error);
      })
    }

    function hangup(remoteClientId) {
      console.log('Hanging up.');
    }

    function handleRemoteHangup(remoteClientId) {
      console.log('Session terminated.');
      document.getElementById(remoteClientId).remove();
      stop(remoteClientId);
    }

    function stop(remoteClientId) {
      peerConnections[remoteClientId].close();
      peerConnections[remoteClientId] = null;

    }

  }, [])

  return (
    <React.Fragment>
      {
        // !loading ?
        // <Grid container spacing={0} direction="column" alignItems="center" justify="center" style={{ minHeight: '100vh' }}>
        //   <Loader type="BallTriangle" className={classes.loader} color={theme.palette.primary.main} height={80} width={80} />
        // </Grid>
        // :
        <div>
          <AppBar position="relative">
            <Toolbar>
              <Grid container spacing={2} justify='space-between' alignItems='center'>
                <div>
                  <Grid container>
                    <img src={logoImg} alt="logo" style={{ width: 40, marginRight: 10 }} />
                    <Typography style={{ color: 'white', marginTop: 5 }}>
                      {loading & exam ? exam.name.toUpperCase() : "EXAMINATOR"}
                    </Typography>
                  </Grid>
                </div>
              </Grid>
            </Toolbar>
          </AppBar>

          <Grid container spacing={0}>
            <Grid item xs={9} style={{ paddingTop: 20, paddingLeft: 20, paddingRight: 20 }} >
              {loading ?
                <Timer duration={exam.duration} startTime={exam.startTime} />
                :
                <Grid container spacing={0} direction="column" alignItems="center" justify="center">
                  <Loader type="BallTriangle" className={classes.loader} color={theme.palette.primary.main} height={80} width={80} />
                </Grid>
              }
              <div id="videos" style={{ paddingTop: 20 }}>
                <video className={classes.video} width="250" ref={videoRef}></video>
              </div>
              <Grid container style={{ paddingLeft: 90 }}>
                <Typography>
                  Camera
                </Typography>
              </Grid>
              <Grid container style={{ paddingLeft: 90 }}>
                <Switch
                  checked={toggleState.checked}
                  onChange={(e) => { settoggleState({ checked: e.target.checked }); }}
                  name="checked"
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
              </Grid>
              <Grid container style={{ paddingLeft: 10 }} >
                {msg &&
                  <Box mt={5}>
                    <Alert severity="error">
                      <AlertTitle>Alert</AlertTitle>
                      {msg}
                    </Alert>
                  </Box>
                }
              </Grid>
            </Grid>

            <Grid item xs={3} style={{ paddingTop: 20, paddingLeft: 30 }}>
              <div className={classes.content}>
                <Typography variant="h6" gutterBottom>
                  Meeting Details
                </Typography>
              </div>
              <Divider />
              <div className={classes.drawerContainer}>
                <List>
                  {students && students.length > 0 ?
                    students.map((student, index) => (
                      <ListItem button key={index}>
                        <ListItemIcon>{index % 2 === 0 ? <Avatar>{student.studentName[0] + student.studentName[1]}</Avatar> : <Avatar>AA</Avatar>}</ListItemIcon>
                        <ListItemText primary={student.studentRegNo} />
                        <ListItemText primary={student.studentName} />
                        {/* <ListItemIcon>{index % 2 === 0 ? <MicIcon></MicIcon> : <MicOffIcon></MicOffIcon>}</ListItemIcon> */}
                      </ListItem>
                    ))
                    :
                    <Typography>No Students in the meeting</Typography>
                  }
                </List>
                <Divider />
                <div className={classes.content}>
                  <Typography variant="h6" gutterBottom>
                    Suspiciousness Levels
                </Typography>
                </div>
                <Divider />
                <List>
                  <ListItem button key='Level 1' className={classes.lvl1} >
                    <ListItemIcon>{<ArrowForwardRoundedIcon />}</ListItemIcon>
                    <ListItemText primary='Level 1' />
                  </ListItem>
                  <ListItem button key='Level 2' className={classes.lvl2}>
                    <ListItemIcon>{<ArrowForwardRoundedIcon />}</ListItemIcon>
                    <ListItemText primary='Level 2' />
                  </ListItem>
                  <ListItem button key='Level 3' className={classes.lvl3}>
                    <ListItemIcon>{<ArrowForwardRoundedIcon />}</ListItemIcon>
                    <ListItemText primary='Level 3' />
                  </ListItem>
                  <ListItem button key='Level 4' className={classes.lvl4}>
                    <ListItemIcon>{<ArrowForwardRoundedIcon />}</ListItemIcon>
                    <ListItemText primary='Level 4' />
                  </ListItem>
                  <ListItem button key='Level 5' className={classes.lvl5}>
                    <ListItemIcon>{<ArrowForwardRoundedIcon />}</ListItemIcon>
                    <ListItemText primary='Level 5' />
                  </ListItem>
                </List>
              </div>
            </Grid>
          </Grid>
          {/* Footer */}
          <Footer />
          {/* End footer */}
        </div>}
    </React.Fragment>
  )
}