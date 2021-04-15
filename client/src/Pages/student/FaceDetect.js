import React from 'react';
import AppBar from './Components/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';
import Divider from '@material-ui/core/Divider';
import { useHistory, useParams, } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Webcam from "react-webcam";
import FaceDetect from '../../assets/Face.png';
import { Alert, AlertTitle } from '@material-ui/lab';
import Box from '@material-ui/core/Box';
import FacialRecognitionService from '../../services/FacialRecognitionService';

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
        // display: 'flex',
        // flexDirection: 'column',
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),

    },
    align: {
        paddingTop: 150
    }
}));

const videoConstraints = {
    width: 480,
    height: 480,
    facingMode: "user"
};

export default function Testpage() {

    const [displayCaptured, setCaptured] = React.useState(false);
    const [displayValidity, setValidity] = React.useState(true);
    const [verification, setVerification] = React.useState("");

    const history = useHistory();
    const navigateTo = (path) => history.push(path);

    const examRoom = useParams().exam;

    const classes = useStyles();

    const webcamRef = React.useRef(null);

    const [image, setImage] = React.useState('');

    var body = {}

    const capture = () => {
        setImage(webcamRef.current.getScreenshot())
        body["file1"] = image;
        body["file2"] = image;
        verifyImage();
    };

    const verifyImage = async () => {
        const verification = await FacialRecognitionService.verifyImage(body);
    }

    const renderValidity = () => {
        return (

            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <Typography>Take a Photo with your face Fitting on the screen.<br></br> Make sure that there is enough light in the room. <br></br>If the photo is not verified, please take a new photo.</Typography>
                        </Grid>
                        <Divider orientation="vertical" flexItem style={{ marginRight: "-1px" }} />

                        <Grid item xs={12} sm={6}>
                            <Webcam
                                audio={false}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                width={480}
                                height={480}
                                videoConstraints={videoConstraints}
                            />
                            {/* <button onClick={capture}>Capture photo</button> */}
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
                            {/* <Card className={classes.card} elevation="7">
                                <CardContent className={classes.cardContent}>
                                    <img src={FaceDetect} width="300" height="300" />
                                    
                                    <Typography variant="h6">Verify Your Identity</Typography>
                                </CardContent>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    endIcon={<Icon></Icon>}
                                    onClick={event => {
                                        setCaptured(true)
                                        setValidity(false);
                                    }}>
                                    Next Step
                                </Button>
                            </Card> */}
                        </Grid>
                    </Grid>
                </Paper>

            </div>

        );
    }

    const renderCaptured = () => {
        return (
            < Grid container className={classes.align} align="center" justify="center" direction="column" >
                <Grid item l={12} >
                    <img src={image} />
                    {/* <Typography variant="h6">Verification Status: Success/Failed</Typography> */}
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
                            </Box> : <div></div>
                    }
                    {/* <Card className={classes.card} elevation="7">
                        <ButtonBase className={classes.cardMargin}
                            onClick={event => { navigateTo(`./Course/Exam/${examRoom}`) }}>
                            <CardContent className={classes.cardContent}>
                                <img src={FaceDetect} width="300" height="300" />
                                <Typography variant="h6">
                                    Video Feed
                                </Typography>
                            </CardContent>
                        </ButtonBase>
                    </Card> */}
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
