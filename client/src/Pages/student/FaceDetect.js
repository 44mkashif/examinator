import React from 'react';
import AppBar from './Components/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { useHistory, useParams, } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Webcam from "react-webcam";
import { Alert, AlertTitle } from '@material-ui/lab';
import Box from '@material-ui/core/Box';
import FacialRecognitionService from '../../services/FacialRecognitionService';
import FormData from 'form-data';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    card: {
        width: 400,
        margin: theme.spacing(1, 3, 2),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),

    },
    align: {
        paddingTop: 100
    },
    padding: {
        paddingTop: 10,

        alignItems: 'center'
    },
    button: {

        borderRadius: 100,

    },
    video: {
        borderStyle: "solid",
        borderColor: theme.palette.primary.main,
    },

}));

const videoConstraints = {
    width: 480,
    height: 480,
    facingMode: "user"
};

export default function Testpage() {

    const studentId = localStorage.getItem('studentId');
    const authToken = localStorage.getItem('auth-token');

    const [displayCaptured, setCaptured] = React.useState(false);
    const [displayValidity, setValidity] = React.useState(true);
    const [verification, setVerification] = React.useState("");

    const history = useHistory();
    const navigateTo = (path) => history.push(path);

    const examRoom = useParams().exam;

    const classes = useStyles();

    const webcamRef = React.useRef(null);

    const [image, setImage] = React.useState(null);

    var data = new FormData();

    const [imgURL, setimgURL] = React.useState(null);

    FacialRecognitionService.getImage(studentId, authToken).then((imgUrl) => {
        setimgURL(imgUrl);
    })

    const capture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImage(imageSrc);
        const capturedImage = dataURLtoFile(imageSrc);
        verifyImage(capturedImage);
    };

    const verifyImage = async (capturedImage) => {
        console.log("Source image url: ", imgURL);

        data.append('file1', capturedImage, capturedImage.name);
        data.append('file2', capturedImage, capturedImage.name);

        const verification = await FacialRecognitionService.verifyImage(data);
        if (verification) {
            setVerification("Success");
            navigateTo(`../Course/Exam/${examRoom}`)
        }
        else setVerification("Error");
    }

    const dataURLtoFile = (dataurl, filename) => {
        const arr = dataurl.split(',')
        const mime = arr[0].match(/:(.*?);/)[1]
        const bstr = atob(arr[1])
        let n = bstr.length
        const u8arr = new Uint8Array(n)
        while (n) {
            u8arr[n - 1] = bstr.charCodeAt(n - 1)
            n -= 1 // to make eslint happy
        }
        return new File([u8arr], filename, { type: mime })
    }

    const renderValidity = () => {
        return (

            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} >
                            <Typography variant="h6" style={{ paddingTop: 200 }}>
                                Take a Photo with your face Fitting on the screen.<br></br> Make sure that there is enough light in the room. <br></br>If the photo is not verified, please take a new photo.
                            </Typography>
                        </Grid>
                        <Divider orientation="vertical" flexItem style={{ marginRight: "-1px" }} />

                        <Grid item xs={12} sm={6}>
                            <Webcam
                                className={classes.video}
                                audio={false}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                width={480}
                                height={480}
                                videoConstraints={videoConstraints}
                            />
                            {/* <button onClick={capture}>Capture photo</button> */}

                            <Grid align="center" className={classes.padding}>
                                <Button

                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    // onClick={capture}
                                    // endIcon={<Icon></Icon>}
                                    onClick={event => {
                                        capture();
                                        setCaptured(true);
                                        setValidity(false);
                                    }}
                                >
                                    Capture Photo
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>

            </div>

        );
    }

    const renderCaptured = () => {
        return (
            < Grid container className={classes.align} >
                <Grid item xs={6} >

                    <img src={image} />
                </Grid>

                <Grid item xs={6} className={classes.align}>
                    {verification == "Success" ?
                        <Box mt={5}>
                            <Alert severity="success">
                                <AlertTitle>Success</AlertTitle>
                                        Verification Status: Successfull
                                </Alert>
                        </Box>
                        : verification == "Error" ?
                            <Box mt={5}>
                                <Alert severity="error">
                                    <AlertTitle>Error</AlertTitle>
                                    Verification Status: Failed
                                </Alert>
                                <Grid align="center" className={classes.padding}>
                                    <div  >
                                        <Button
                                            variant="contained"
                                            color="primary"

                                            className={classes.button}
                                            onClick={event => {
                                                setValidity(true);
                                                setCaptured(false);
                                            }}
                                        >Recapture</Button>
                                    </div>
                                </Grid>

                            </Box> : <div></div>

                    }
                </Grid>
            </Grid>
        );
    }



    return (
        <React.Fragment>
            <AppBar />
            <CssBaseline />
            <Container fixed>
                {!!displayValidity ? renderValidity() : null}
                {!!displayCaptured ? renderCaptured() : null}
            </Container>
        </React.Fragment>
    )
};
