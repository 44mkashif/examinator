import React from 'react';
import AppBar from './Components/AppBar';
import Grid from '@material-ui/core/Grid';
<script src="https://webrtc.github.io/adapter/adapter-latest.js"></script>

export default function Exam() {

    const videoRef = React.useRef(null);

    React.useEffect(()=>{
        navigator.mediaDevices.getUserMedia({
            audio: false,
            video: true
        }).then((stream)=>{
            let loaclVideo = videoRef.current;
            loaclVideo.srcObject = stream;
            loaclVideo.play();
            console.log('Local Video Streaming....')
        })
        
    }, [])

    return(
        <React.Fragment>
            <AppBar/>
            <Grid container justify="start" xs>
                <video width="250" ref={videoRef}></video>
            </Grid>
        </React.Fragment>
    )
}