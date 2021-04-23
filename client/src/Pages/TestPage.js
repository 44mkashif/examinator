import React from 'react';
import AppBar from './Components/AppBar';
import Grid from '@material-ui/core/Grid';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';
import Switch from '@material-ui/core/Switch';
import { Alert, AlertTitle } from '@material-ui/lab';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Footer from './Components/Footer';

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

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
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: drawerWidth,
    },
    title: {
        flexGrow: 1,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-start',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginRight: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: 0,
    },
}));

export default function Exam() {
    examRoom = useParams().exam;
    const videoRef = React.useRef(null);
    const [msg, setmsg] = React.useState('');
    const [toggleState, settoggleState] = React.useState({
        checked: true,
    });

    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    React.useEffect(() => {
        const socket = io("http://127.0.0.1:4001");
        socket.emit('on/off stream', { type: 'on/off', toggleState: toggleState }, examRoom);
    }, [toggleState])

    React.useEffect(() => {

        const socket = io("http://127.0.0.1:4001");
        var videoDivision = document.querySelector('#videos');

        if (examRoom != '') {
            socket.emit('create', examRoom);
        }

        socket.on('message', (message, remoteClientId) => {
            if (message == 'got stream' && isCreator) {
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
            } else if (message == 'close') {
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
        }).then((stream) => {
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
            let remoteVideo = document.createElement('video');
            remoteVideo.srcObject = remoteStream;
            remoteVideo.autoplay = true;
            remoteVideo.id = remoteId;
            remoteVideo.width = 250;
            videoDivision.appendChild(remoteVideo);
        }
        function handleRemoteStreamRemoved(e) {

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
            <AppBar />
            
            <Grid container justify="start" xs style={{ paddingTop: 20, paddingLeft: 20, paddingRight: 20 }} >
                <div id="videos" >
                    <video width="250" ref={videoRef}></video>
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
                <Grid container justify="start" xs style={{ paddingLeft: 10 }} >
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
            {/* Footer */}
            <Footer />
            {/* End footer */}
        </React.Fragment>
    )
}