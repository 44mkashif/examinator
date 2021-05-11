import React from 'react';
import io from 'socket.io-client';
import { useHistory, useParams } from 'react-router-dom';
import logoImg from './../../assets/navbar-2.png';
import ExamService from '../../services/ExamService';
import ResultService from '../../services/ResultService';
import Footer from '../Components/Footer';
import Timer from './Components/Timer';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import PersonIcon from '@material-ui/icons/Person';
import Box from '@material-ui/core/Box';
import { Alert, AlertTitle } from '@material-ui/lab';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Paper from '@material-ui/core/Paper';
import theme from './../../theme';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

<script src="https://webrtc.github.io/adapter/adapter-latest.js"></script>

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    paddingLeft: 40,
    color: theme.palette.text.secondary,
    userSelect: 'none'
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
    borderColor: theme.palette.secondary.main
  },
  avatar: {
    borderStyle: "solid",
    borderColor: theme.palette.secondary.main,
    font: "1500px",
    width: "350px",
    height: "240px",
    color: theme.palette.secondary.main
  },
  avatarText: {
    color: theme.palette.secondary.main,
    marginTop: 5,
    marginBottom: 5
  },
  text: {
    userSelect: 'none'
  },
  loader: {
    display: 'flex',
  }

}));

var temp = 0;

var isAnswered = false;
var localStream;
var remoteStream;
var examRoom;
var peerConnection;
var questions = [];
var exam;
var submittedAnswers = [];
const selectedOptions = [];

const socket = io("http://127.0.0.1:4001");

window.onbeforeunload = () => {
  socket.emit('message', 'close', examRoom);
};

export default function AutoGrid() {

  const videoRef = React.useRef(null);
  const remoteVideoRef = React.useRef(null);
  examRoom = useParams().exam;
  const authToken = localStorage.getItem('auth-token');
  const studentId = localStorage.getItem('studentId');

  React.useEffect(() => {

    const socket = io("http://127.0.0.1:4001");
    var videoDivision = document.querySelector('.videos');

    window.onfocus = () => {
      socket.emit('message', { type: 'focus' }, examRoom);
    };

    window.onblur = () => {
      socket.emit('message', { type: 'blur', name: localStorage.getItem('studentName') }, examRoom);
      count += 1;
      setErrorMsg(`You have changed the tab ${count} times. Your Exam will be cancelled after ${3 - count} more warnings`);
      if (count === 3) {
        submitExam(null, "Your Exam has been cancelled");
      }
    };

    if (examRoom !== '') {
      socket.emit('join', examRoom);
    }



    socket.on('message', (message) => {
      if (message.type === 'offer' && !isAnswered) {
        console.log('student getting offer');
        peerConnection.setRemoteDescription(new RTCSessionDescription(message));
        doAnswer();
      } else if (message.type === 'candidate') {
        console.log('student getting candidate info');
        let candidate = new RTCIceCandidate({
          sdpMLineIndex: message.label,
          candidate: message.candidate
        });
        peerConnection.addIceCandidate(candidate);
      } else if (message === 'close') {
        handleRemoteHangup();
      } else if (message.type === 'on/off') {
        if (message.toggleState.checked) {
          console.log('retain')
          document.getElementById('remoteVideo').hidden = false;
          document.getElementById('instructorAvatar').hidden = true;
        } else {
          console.log('remove')
          document.getElementById('remoteVideo').hidden = true;
          document.getElementById('instructorAvatar').hidden = false;
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

      document.getElementById('remoteVideo').hidden = false;
      document.getElementById('instructorAvatar').hidden = true;
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

    ExamService.getExam(examRoom, authToken, false).then((examFromDb) => {
      questions = []

      exam = examFromDb[0];
      console.log("Exam from db: ", exam);

      const examDate = new Date(exam.startTime);
      const duration = exam.duration;
      examDate.setHours(examDate.getHours() + duration);

      const now = new Date();

      if (examDate < now) {
        console.log("Exam date: ", examDate);
        console.log("Today: ", now);
        console.log("Exam over");
        navigateTo(`../ExamComplete/${examRoom}`);
      }

      exam.question.forEach((question, i) => {
        // <Question question={"Question " + (i + 1) + ": " + question.statement} options={question.options} qNo={i} />
        questions.push(
          <div>
            <Paper className={classes.paper}>
              <FormControl component="fieldset">
                <FormLabel component="legend">
                  Q{(i + 1)}: {question.statement}
                </FormLabel>
                <RadioGroup aria-label="answer" name="answer1" value={selectedOptions[i]} onChange={event => handleOptionChange(event, question, i)}>
                  <FormControlLabel value="0" control={<Radio />} label={question.options[0]} />
                  <FormControlLabel value="1" control={<Radio />} label={question.options[1]} />
                  <FormControlLabel value="2" control={<Radio />} label={question.options[2]} />
                  <FormControlLabel value="3" control={<Radio />} label={question.options[3]} />
                </RadioGroup>
              </FormControl>
            </Paper>
          </div>
        )
      });
      console.log("Ques: ", questions);

      setLoading(true);

    });

  }, []);

  const classes = useStyles();
  const [qNo, setQNo] = React.useState('');
  const [activebutton, setButton] = React.useState(true);
  const [selected, setSelected] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  var count = 0;
  const [errorMsg, setErrorMsg] = React.useState('');
  // const [selectedOption, setSelectedOption] = React.useState('');

  const history = useHistory();
  const navigateTo = (path) => history.push(path);
  const navigateToWithData = (path, msg) => history.push({
    pathname: path,
    state: { data: msg }
  });


  const handleChange = () => {
    setSelected(true);
    submitAnswer(temp);
    // currentQues.pop();
    console.log("Q: ", questions);

    if (qNo >= questions.length - 1 || qNo === undefined) {
      setButton(false);
    }

    console.log("temp: ", temp);
    setQNo(++temp);
  };

  const submitAnswer = (index) => {
    console.log(index);

    var answer = {
      questionId: exam.question[index]._id,
      studentId: studentId,
      examId: examRoom,
      markedOption: selectedOptions[index]
    }
    console.log(answer);

    ExamService.submitAnswer(answer, authToken).then(res => {
      console.log(res);
    })
  }

  const submitExam = (event, msg) => {
    //Fetch answers and submit result
    submittedAnswers = [];
    setLoading(false);

    ResultService.getAnswers(examRoom, studentId, authToken).then(res => {
      submittedAnswers = res;

      var questions = exam.question;
      var answers = [];

      console.log("Questions: ", questions);

      if (submittedAnswers && submittedAnswers.length > 0) {

        console.log("Student Answers: ", submittedAnswers);

        submittedAnswers.forEach(answer => {
          questions.forEach(question => {
            if (question._id === answer.questionId) {
              answers.push({
                qId: question._id,
                marks: question.marks,
                correctOption: question.correctOption,
                markedOption: answer.markedOption
              })
            }
          });
        });
      }

      var result = {
        examId: examRoom,
        studentId: studentId,
        totalMarks: exam.totalMarks,
        obtainedMarks: 0
      }

      if (answers.length > 0) {
        answers.forEach(answer => {
          if (answer.markedOption === answer.correctOption) {
            result.obtainedMarks += answer.marks;
          }
        });
      }

      console.log("Result: ", result);
      ResultService.addResult(result, authToken).then(res => {
        console.log(res);
        setLoading(true);
        navigateToWithData(`../ExamComplete/${examRoom}`, msg);
      })
    })

  }

  const handleOptionChange = (event, question, index) => {
    setSelected(false);
    console.log(event.target.value);
    // setSelectedOption(event.target.value);

    // selectedOptions[index] = question.options.indexOf(event.target.value);
    selectedOptions[index] = parseInt(event.target.value);
    console.log("selectedOptions", selectedOptions);
    console.log("selectedOption", question.options[selectedOptions[index]]);
  };

  // var questionNum;

  // var ques = ["A linear collection of data elements where the linear node is given by means of pointer is called?",
  //   "In linked list each node contains a minimum of two fields. One field is data field to store the data second field is?",
  //   "What would be the asymptotic time complexity to add a node at the end of singly linked list, if the pointer is initially pointing to the head of the list?",
  //   "The concatenation of two lists can be performed in O(1) time. Which of the following variation of the linked list can be used?",
  //   "What would be the asymptotic time complexity to insert an element at the front of the linked list (head is known)"];

  // for (var i = 0; i < questionNum; i++) {
  //   questions.push(<Question question={"Question " + i + ": " + ques[i]} qNo={i} />);
  // }

  return (
    <React.Fragment >
      {!loading ?
        <Grid container spacing={0} direction="column" alignItems="center" justify="center" style={{ minHeight: '100vh' }}>
          <Loader type="BallTriangle" className={classes.loader} color={theme.palette.primary.main} height={80} width={80} />
        </Grid>
        :
        <div>
          <AppBar position="relative">
            <Toolbar>
              <Grid container spacing={2} justify='space-between' alignItems='center'>
                <div>
                  <Grid container>
                    <img src={logoImg} alt="logo" style={{ width: 40, marginRight: 10 }} />
                    <Typography style={{ color: 'white', marginTop: 5 }}>
                      {exam ? exam.name.toUpperCase() : "EXAMINATOR"}
                    </Typography>
                  </Grid>
                </div>
              </Grid>
            </Toolbar>
          </AppBar>

          <div className={classes.root}>
            <Grid container spacing={3}>
              <Grid item xs={9} style={{ paddingTop: 40 }} >
                {/* <Timer duration={exam.duration} startTime={exam.startTime} /> */}
                <Timer duration={exam.duration} startTime={exam.startTime} />
                {questions[qNo ? qNo : 0]}

                <Box mt={5} hidden={activebutton}>
                  <Alert severity="success">
                    <AlertTitle>Thank You</AlertTitle>
                    Your Exam is Finished. Press Submit to Proceed.
                  </Alert>
                </Box>

                <div>
                  {errorMsg &&
                    <Box mt={5}>
                      <Alert severity="error">
                        <AlertTitle>Alert</AlertTitle>
                        {errorMsg}
                      </Alert>
                    </Box>
                  }
                </div>

                <Grid container spacing={2} justify="center" style={{ paddingTop: 40 }}>
                  <Grid item>
                    <Button variant="contained" color="primary" className={classes.button} onClick={handleChange} disabled={selected} >
                      Save &amp; Next
                  </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" color="secondary" className={classes.button}
                      disabled={activebutton} onClick={event => submitExam(event, "Your Exam has been Submitted")}>
                      Submit
                  </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container justify="right" xs style={{ paddingTop: 40 }}>
                <div className="videos">

                  <video className={classes.video} width="350" ref={videoRef}></video>
                  <div>
                    <Typography className={classes.avatarText} align="center" variant="h6">
                      Student
                  </Typography>
                  </div>

                  <video id="remoteVideo" className={classes.rvideo} width="350" ref={remoteVideoRef} hidden></video>
                  <div id="instructorAvatar">
                    <PersonIcon className={classes.avatar} />
                  </div>
                  <div>
                    <Typography className={classes.avatarText} align="center" variant="h6">
                      Instructor
                  </Typography>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
          <Footer />
        </div>
      }
    </React.Fragment >

  );
}