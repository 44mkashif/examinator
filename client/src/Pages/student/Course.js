import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { useHistory } from 'react-router-dom';
import logoImg from './../../assets/navbar-2.png';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import DateRangeIcon from '@material-ui/icons/DateRange';
import Divider from '@material-ui/core/Divider';
import ExamService from '../../services/ExamService';
import TimerIcon from '@material-ui/icons/Timer';
import Footer from '../Components/Footer';
import { useParams } from 'react-router-dom';
import CourseService from './../../services/CourseService';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import theme from './../../theme';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    // paper: {
    //     padding: theme.spacing(2),
    //     textAlign: 'center',
    //     color: theme.palette.text.secondary,
    // },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    button: {
        borderRadius: 100,
        padding: 10

    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    buttonText: {
        color: theme.palette.primary.contrastText,
        paddingLeft: 10
    },
    logoImg: {
        width: 40,
        marginRight: 10
    },
    datePicker: {
        borderRadius: 100
    },
    card: {
        width: 300,
        margin: theme.spacing(1, 3, 2),
        // display: 'flex',
        // flexDirection: 'column',
    },
    editClass: {
        color: theme.palette.secondary.dark
    },
    deleteClass: {
        color: theme.palette.error.main
    },
    textField: {
        [`& fieldset`]: {
            borderRadius: 100,
            borderWidth: '2px'
        }
    },
    iconClass: {
        color: theme.palette.secondary.dark,
        paddingTop: 10
    },
    margin: {
        marginLeft: 10,
        paddingTop: 10
    },
    cardMargin: {
        marginLeft: 65,
        paddingTop: 20
    },
    content: {
        fullWidth: 100,
    },
    scheduleClass: {
        color: theme.palette.secondary.dark,
        marginRight: 5
    },
    whiteColor: {
        color: theme.palette.primary.contrastText
    },
    loader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '350px'
    }
}));

var examDates = [];
var examTimes = [];

var pExamDates = [];
var pExamTimes = [];

var examData = [];
var prevExam = [];

export default function Course() {

    const [course, setCourse] = React.useState("");
    const history = useHistory();
    const navigateTo = (path) => history.push(path);
    const classes = useStyles();

    const [loading, setLoading] = React.useState(false);
    // const [errorMessage, setErrorMessage] = React.useState(false);
    const courseId = useParams().course;
    const authToken = localStorage.getItem('auth-token');

    // var course;

    useEffect(() => {
        CourseService.getCourse(courseId, authToken, false).then((courseFromDb) => {
            console.log(courseFromDb);
            setCourse(courseFromDb);
            // course = courseFromDb;
        });
    }, []);



    const processDate = (startTime) => {
        const date = new Date(startTime);

        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;

        const strTime = hours + ':' + minutes + ' ' + ampm;
        const strDate = months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
        return [strDate, strTime];
    }

    ExamService.getExams(courseId, authToken).then((examsFromDb) => {
        console.log(examsFromDb);

        examData = [];
        prevExam = [];
        examDates = [];
        pExamDates = [];
        examTimes = [];
        pExamTimes = [];

        examsFromDb.forEach((exam) => {
            const examDate = new Date(exam.startTime);
            const duration = exam.duration;
            examDate.setHours(examDate.getHours() + duration);

            const now = new Date();

            if (examDate < now) {
                console.log("Exam date: ", examDate);
                console.log("Today: ", now);

                prevExam.push(exam);
            } else {
                examData.push(exam);
            }
        })

        examData.forEach(exam => {
            const dt = processDate(exam.startTime);
            examDates.push(dt[0]);
            examTimes.push(dt[1]);
        });

        prevExam.forEach(exam => {
            const dt = processDate(exam.startTime);
            pExamDates.push(dt[0]);
            pExamTimes.push(dt[1]);
        });

        setLoading(true);

    })

    let idYouWant;
    let propertyYouWant = "courseName";

    let res = examData.filter((item) => {
        console.log(item._id)
        return item._id;
    });
    console.log(course, "this is the course");
    console.log(examData, "This is exa data");


    // if(examData.length === 0){
    //     setErrorMessage(true);
    // }
    // let courseName;
    // for()
    console.log(examData.length, "lenght of exam data");

    return (
        <React.Fragment>
            {!loading ?
                <Loader type="BallTriangle" className={classes.loader} color={theme.palette.primary.main} height={80} width={80} />
                :
                <div>
                    <AppBar position="relative">
                        <Toolbar>
                        <Grid container spacing={2} justify='space-between' alignItems='center'>
                            <div>
                                <Button >
                                    
                                    <img src={logoImg} alt="logo" style={{ width: 40, marginRight: 10 }} />
                                    <Typography className={classes.whiteColor}>
                                    {course["courseName"]}
                                    </Typography>
                                </Button>
                            </div>
                            </Grid>
                        </Toolbar>
                    </AppBar>

                    <div className={classes.root}>
                        <Container className={classes.cardGrid} >

                            <Typography>
                                Scheduled Exams
                            </Typography>
                            <br />
                            <Divider variant="middle" />
                            <br />
                            <Grid container spacing={4} justify="center">
                                {examData && examData.length === 0 ? <h4>No Scheduled Exams found</h4> :
                                    <div> {examData.map((exam, i) => (
                                        <div key={i} className={classes.card}>
                                            <Card className={classes.card} elevation="7">
                                                <ButtonBase className={classes.cardMargin}
                                                    onClick={event => { navigateTo(`../Course/ExamInstruction/${exam._id}`) }}
                                                >
                                                    <CardContent className={classes.cardContent}>
                                                        <Typography gutterBottom variant="h5" component="h2">
                                                            {exam.name}
                                                        </Typography>
                                                        <Grid container justify="center">
                                                            <TimerIcon className={classes.iconClass} />
                                                            <Typography className={classes.margin}>
                                                                Duration: {exam.duration} hrs
                                                </Typography>
                                                        </Grid>
                                                        <Grid container justify="center">
                                                            <DateRangeIcon className={classes.iconClass} />
                                                            <Typography className={classes.margin}>
                                                                {examDates[i]}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid container justify="center">
                                                            <AccessTimeIcon className={classes.iconClass} />
                                                            <Typography className={classes.margin}>
                                                                {examTimes[i]}
                                                            </Typography>
                                                        </Grid>
                                                    </CardContent>
                                                </ButtonBase>
                                            </Card>

                                        </div>
                                    ))}</div>}
                                {/* {examData.map((exam, i) => (
                            <div key={i} className={classes.card}>
                                <Card className={classes.card} elevation="7">
                                    <ButtonBase className={classes.cardMargin}
                                        onClick={event => { navigateTo(`../Course/ExamInstruction/${exam._id}`) }}
                                    >
                                        <CardContent className={classes.cardContent}>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {exam.name}
                                            </Typography>
                                            <Grid container justify="center">
                                                <TimerIcon className={classes.iconClass} />
                                                <Typography className={classes.margin}>
                                                    Duration: {exam.duration} hrs
                                                </Typography>
                                            </Grid>
                                            <Grid container justify="center">
                                                <DateRangeIcon className={classes.iconClass} />
                                                <Typography className={classes.margin}>
                                                    {examDates[i]}
                                                </Typography>
                                            </Grid>
                                            <Grid container justify="center">
                                                <AccessTimeIcon className={classes.iconClass} />
                                                <Typography className={classes.margin}>
                                                    {examTimes[i]}
                                                </Typography>
                                            </Grid>
                                        </CardContent>
                                    </ButtonBase>
                                </Card>

                            </div>
                        ))} */}

                            </Grid>

                            <Typography>
                                Previous Exams
                            </Typography>
                            <br />
                            <Divider variant="middle" />
                            <br />
                            <Grid container spacing={4} justify="center">
                                {prevExam.map((exam, i) => (
                                    <div key={i} className={classes.card}>
                                        <Card className={classes.card} elevation="7">
                                            <ButtonBase className={classes.cardMargin}
                                                onClick={event => { navigateTo(`../Course/ExamPrevious/${exam._id}`) }}
                                            >
                                                <CardContent className={classes.cardContent}>
                                                    <Typography gutterBottom variant="h5" component="h2">
                                                        {exam.name}
                                                    </Typography>
                                                    <Grid container justify="center">
                                                        <TimerIcon className={classes.iconClass} />
                                                        <Typography className={classes.margin}>
                                                            Duration: {exam.duration} hrs
                                                </Typography>
                                                    </Grid>
                                                    <Grid container justify="center">
                                                        <DateRangeIcon className={classes.iconClass} />
                                                        <Typography className={classes.margin}>
                                                            {pExamDates[i]}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid container justify="center">
                                                        <AccessTimeIcon className={classes.iconClass} />
                                                        <Typography className={classes.margin}>
                                                            {pExamTimes[i]}
                                                        </Typography>
                                                    </Grid>
                                                </CardContent>
                                            </ButtonBase>
                                        </Card>

                                    </div>
                                ))}

                            </Grid>

                        </Container>
                    </div>
                    {/* Footer */}
                    <Footer />
                    {/* End footer */}
                </div>
            }
        </React.Fragment>
    );
}
