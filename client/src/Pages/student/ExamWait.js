import React, { useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import logoImg from './../../assets/navbar-2.png';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { useHistory, useParams, } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import ExamService from '../../services/ExamService';
import theme from './../../theme';
import TimerIcon from '@material-ui/icons/Timer';
import AddIcon from '@material-ui/icons/Add';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: 120
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
    iconClass: {
        color: theme.palette.secondary.dark,
        marginTop: 20
    },
    margin: {
        marginLeft: 10,
        marginTop: 20
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
    avatar: {
        font: "1500px",
        width: "100px",
        height: "150px",
        color: theme.palette.secondary.main
    },
    video: {
        borderStyle: "solid",
        borderColor: theme.palette.primary.main,
    },
    loader: {
        display: 'flex',
    }
}));

var exam;

export default function Testpage() {

    const studentId = localStorage.getItem('studentId');
    const authToken = localStorage.getItem('auth-token');
    const [loading, setLoading] = React.useState(false);

    const history = useHistory();
    const navigateTo = (path) => history.push(path);

    const examRoom = useParams().exam;

    const classes = useStyles();

    useEffect(() => {
        ExamService.getExam(examRoom, authToken, false).then(examFromDb => {
            exam = examFromDb[0];

            exam.startTime = processDate(exam.startTime);
            console.log("Exam from db: ", exam);
            setLoading(true);
        })
    }, []);

    const processDate = (date) => {
        date = new Date(date);

        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;

        const strTime = hours + ':' + minutes + ' ' + ampm;
        const strDate = months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
        return strDate + " " + strTime;
    }


    return (
        <React.Fragment>
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
                    <CssBaseline />
                    <Container fixed>
                        <div className={classes.root}>
                                <Grid container spacing={1} align='center' justify='center'>
                                    <Grid item xs={12} >
                                        <AccessTimeIcon className={classes.avatar}/>
                                        <Typography variant="h5" component="h3" style={{ paddingTop: 20 }}>
                                            {exam.name} is scheduled at {exam.startTime}
                                        </Typography>
                                        <Grid container justify="center">
                                            <TimerIcon className={classes.iconClass} />
                                            <Typography variant="h5 " component="h3" className={classes.margin}>
                                                Duration: {exam.duration} hrs
                                            </Typography>
                                        </Grid>
                                        <Grid container justify="center">
                                            <AddIcon className={classes.iconClass} />
                                            <Typography variant="h5 " component="h3" className={classes.margin}>
                                                Total marks: {exam.totalMarks}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        {/* <button onClick={capture}>Capture photo</button> */}

                                        <Grid align="center" className={classes.padding}>
                                            {/* Chudri ye button styling krty huy remove kr dena */}
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
                 </div>
                    </Container>
                </div>
            }
        </React.Fragment>
    )
};
