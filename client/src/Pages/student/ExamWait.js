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
import FormData from 'form-data';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

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
    // const [srcImg, setSrcImg] = React.useState(null);

    const history = useHistory();
    const navigateTo = (path) => history.push(path);

    const examRoom = useParams().exam;

    const classes = useStyles();

    const webcamRef = React.useRef(null);


    var data = new FormData();

    return (
        <React.Fragment>
            <AppBar />
            <CssBaseline />
            <Container fixed>
                <div className={classes.root}>
                    <Paper className={classes.paper}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} >
                                <AccessTimeIcon />
                                <Typography variant="h6" style={{ paddingTop: 100 }}>
                                    Your Exam is scheduled at 10:00pm - 12:00pm Eastern Standard Time
                            </Typography>
                                <Typography variant="h6" style={{ paddingTop: 100 }}>
                                    Data Structures Mid Term Exam.
                            </Typography>
                            </Grid>
                            <Divider orientation="vertical" flexItem style={{ marginRight: "-1px" }} />

                            <Grid item xs={12}>
                                {/* <button onClick={capture}>Capture photo</button> */}

                                <Grid align="center" className={classes.padding}>
                                    <Button

                                        variant="contained"
                                        color="primary"
                                        className={classes.button} x
                                        // onClick={capture}
                                        // endIcon={<Icon></Icon>}
                                        onClick={event => {
                                            navigateTo(`../Course/Exam/${examRoom}`)
                                        }}
                                    >
                                        Test Camera
                                </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>

                </div>
            </Container>
        </React.Fragment>
    )
};
