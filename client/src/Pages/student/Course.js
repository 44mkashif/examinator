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
import ResultService from '../../services/ResultService';
import TimerIcon from '@material-ui/icons/Timer';
import Footer from '../Components/Footer';
import { useParams } from 'react-router-dom';
import CourseService from './../../services/CourseService';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import theme from './../../theme';
import AddIcon from '@material-ui/icons/Add';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

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
        border: `1px solid ${theme.palette.primary.dark}`,
        borderRadius: "10px"
    },
    cardDiv: {
        padding: "10px",
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
    loader: {
        display: 'flex',
    },
    whiteColor: {
        color: theme.palette.primary.contrastText
    },
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
    const studentId = localStorage.getItem('studentId');

    // var course;

    useEffect(() => {
        CourseService.getCourse(courseId, authToken, false).then((courseFromDb) => {
            // console.log("Course From Db: ", courseFromDb);
            setCourse(courseFromDb);
            // course = courseFromDb;
        });

        ExamService.getExams(courseId, authToken).then((examsFromDb) => {
            // console.log("Exams from db: ", examsFromDb);

            examData = [];
            prevExam = [];
            examDates = [];
            pExamDates = [];
            examTimes = [];
            pExamTimes = [];

            if (examsFromDb && examsFromDb.length > 0) {
                examsFromDb.forEach((exam) => {
                    const examDate = new Date(exam.startTime);
                    const duration = exam.duration;
                    examDate.setHours(examDate.getHours() + duration);

                    const now = new Date();

                    if (examDate < now) {
                        // console.log("Exam date: ", examDate);
                        // console.log("Today: ", now);
                        prevExam.push(exam);
                    } else {
                        examData.push(exam);
                    }

                });

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

                // console.log("Prev Exams: ", prevExam);
                // console.log("Exams: ", examData);

                examData.forEach(exam => {
                    ResultService.getResult(exam._id, studentId, authToken).then(res => {
                        if (res) {
                            exam.submitted = true;
                        }
                    })
                });

                var requests = [];
                prevExam.forEach((exam) => {
                    requests.push(fetchResults(exam));
                });

                Promise.all(requests).then(() => {
                    console.log("prevExam: ", prevExam);
                    console.log("Loading finished");
                    setLoading(true);
                })
            } else {
                console.log("Loading finished");
                setLoading(true);
            }

        });

    }, []);

    const fetchResults = (exam) => {
        return new Promise(resolve => {
            ResultService.getResult(exam._id, studentId, authToken)
                .then(res => {
                    if (res) {
                        exam.result = res[0];
                        exam.submitted = true;
                    }
                })
                .then((data) => {
                    resolve(data);
                })
                .catch((e) => {
                    console.log(e);
                })
        });
    }

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

    const examClicked = (event, exam) => {
        console.log("Exam clicked", exam)
        if (exam.submitted) {
            navigateTo(`../../Student/ExamAlreadySubmitted/${exam._id}`)
        }
        else if (!exam.hallCreated) {
            navigateTo(`../../Student/ExamWait/${exam._id}`)
        }
        else {
            navigateTo(`../Course/ExamInstruction/${exam._id}`)
        }
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
                                        <Button component={Link} to="/student/dashboard">
                                            <img src={logoImg} alt="logo" className={classes.logoImg} />
                                            <Typography className={classes.whiteColor} noWrap>
                                                {course ? course["courseName"].toUpperCase() : "EXAMINATOR"}
                                            </Typography>
                                        </Button>

                                    </Grid>
                                </div>
                            </Grid>
                        </Toolbar>
                    </AppBar>

                    <div className={classes.root}>
                        <Container className={classes.cardGrid} >

                            <Typography variant="h4">
                                Scheduled Exams
                            </Typography>
                            <br />
                            <Divider variant="middle" />
                            <br />

                            {examData && examData.length === 0 ?
                                <Grid container spacing={4} justify="center">
                                    <h4>No Scheduled Exams found</h4>
                                </Grid>
                                :
                                <Grid container spacing={4} justify="center">
                                    {examData.map((exam, i) => (
                                        <div key={i} className={classes.cardDiv}>
                                            <Card className={classes.card} elevation="7">
                                                <ButtonBase className={classes.cardMargin}
                                                    onClick={event => examClicked(event, exam)}
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
                                    ))}
                                </Grid>
                            }
                            <br />
                            <br />

                            <Typography variant="h4">
                                Previous Exams
                            </Typography>
                            <br />
                            <Divider variant="middle" />
                            <br />
                            {/* <Grid container spacing={4} justify="center"> */}
                            {prevExam.length === 0 ?
                                <Grid container spacing={4} justify="center">
                                    <h4>No previous Exam yet</h4>
                                </Grid>
                                :
                                <Grid container spacing={4} justify="center">
                                    {prevExam.map((exam, i) => (
                                        <div key={i} className={classes.cardDiv}>
                                            <Card className={classes.card} elevation="7">
                                                <CardContent className={classes.cardContent}>
                                                    <Grid container justify="center">
                                                        <Typography gutterBottom variant="h5" component="h2">
                                                            {exam.name}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid container justify="center">
                                                        <DateRangeIcon className={classes.iconClass} />
                                                        <Typography className={classes.margin}>
                                                            {pExamDates[i]}
                                                        </Typography>
                                                    </Grid>
                                                    {exam.submitted && exam.result ?
                                                        <div>
                                                            <Grid container justify="center">
                                                                <AddIcon className={classes.iconClass} />
                                                                <Typography className={classes.margin}>
                                                                    Total Marks: {exam.result.totalMarks}
                                                                </Typography>
                                                            </Grid>
                                                            <Grid container justify="center">
                                                                <AssignmentTurnedInIcon className={classes.iconClass} />
                                                                <Typography className={classes.margin}>
                                                                    Obtained Marks: {exam.result.obtainedMarks}
                                                                </Typography>
                                                            </Grid>
                                                        </div>
                                                        :
                                                        <div>Not submitted</div>
                                                    }
                                                </CardContent>
                                            </Card>

                                        </div>
                                    ))}
                                </Grid>
                            }

                            {/* </Grid> */}

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
