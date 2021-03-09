import React from 'react';
import AppBar from './Components/AppBar';
import Grid from '@material-ui/core/Grid';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';
import Switch from '@material-ui/core/Switch';
<script src="https://webrtc.github.io/adapter/adapter-latest.js"></script>

var isCreator = false;
var localStream;
var remoteStream;
var examRoom;
var peerConnections = {};
var remoteId;

export default function Exam() {
    const examRoom = useParams().exam;
    const videoRef = React.useRef(null);
    const [msg, setmsg] = React.useState('');
    const [toggleState, settoggleState] = React.useState({
      checked: true,
    });

    React.useEffect(()=>{
      const socket = io("http://127.0.0.1:4001");
      socket.emit('on/off stream', {type: 'on/off', toggleState: toggleState}, examRoom);
    }, [toggleState])

    React.useEffect(()=>{

        const socket = io("http://127.0.0.1:4001");
        var videoDivision = document.querySelector('#videos');
        
        if(examRoom != '') {
          socket.emit('create', examRoom);
        }

        socket.on('message', (message, remoteClientId) => {
          if(message == 'got stream' && isCreator) {
              console.log('instructor getting client signal');
              createPeerConnection(remoteClientId);
              doCall(remoteClientId);
          } else if (message.type == 'answer' && isCreator) {
              peerConnections[remoteClientId].setRemoteDescription(new RTCSessionDescription(message));
              remoteId = remoteClientId;
          } else if (message.type == 'candidate') {
              console.log('instructor getting candidate info');
              let candidate = new RTCIceCandidate({
                  sdpMLineIndex: message.label,
                  candidate: message.candidate
              });
              peerConnections[remoteClientId].addIceCandidate(candidate);
          } else if (message == 'close'){
              console.log('remote stream closed...');
              handleRemoteHangup(remoteClientId);
          } else if (message.type == 'blur') {
            setmsg(message.name + ' has changed tab');
          } else if (message.type == 'focus') {
            setmsg('');
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
        }).then((stream)=>{
            let localVideo = videoRef.current;
            localVideo.srcObject = stream;
            localStream = stream;
            localVideo.play();
            console.log('Local Video Streaming....')

            // socket.emit('message', 'got stream', examRoom)
        })

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
      
          function handleIceCandidate (e) {
            console.log('instructor sending candidate info');
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
            console.log('stream received')
            remoteStream = e.stream;
            let remoteVideo = document.createElement('video');
            remoteVideo.srcObject = remoteStream;
            remoteVideo.autoplay = true;
            remoteVideo.id = remoteId;
            remoteVideo.width = 250;
            videoDivision.appendChild(remoteVideo);
          }
          function handleRemoteStreamRemoved (e) {
            
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
    

    return(
        <React.Fragment>
            <AppBar/>
            <Grid container justify="start" xs>
            <div id="videos">
              <video width="250" ref={videoRef}></video>
            </div>
            <Switch
              checked={toggleState.checked}
              onChange={(e)=>{settoggleState({ checked: e.target.checked });}}
              name="checked"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
            {msg}
            </Grid>
        </React.Fragment>
    )
}