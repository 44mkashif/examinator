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
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import TimerIcon from '@material-ui/icons/Timer';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import TextField from '@material-ui/core/TextField';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DateRangeIcon from '@material-ui/icons/DateRange';
import DeleteIcon from '@material-ui/icons/Delete';
import DateFnsUtils from '@date-io/date-fns';
import Footer from '../Components/Footer';
import { useParams } from 'react-router-dom';
import CourseService from './../../services/CourseService';
import ResultService from './../../services/ResultService';
import Divider from '@material-ui/core/Divider';
import theme from './../../theme';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import ExamService from '../../services/ExamService';

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
        border: `2px solid ${theme.palette.primary.main}`,
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
    cardContent: {
        justifyContent: 'center',
    },
    scheduleClass: {
        color: theme.palette.secondary.dark,
        marginRight: 5
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

var body = {}



export default function Course() {
    const [course, setCourse] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const courseId = useParams().course;
    const authToken = localStorage.getItem('auth-token');

    useEffect(() => {
        CourseService.getCourse(courseId, authToken, false).then((courseFromDb) => {
            console.log(courseFromDb);
            setCourse(courseFromDb);
        });
        ExamService.getExams(courseId, authToken).then((examsFromDb) => {
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

    const history = useHistory();
    const navigateTo = (path) => history.push({
        pathname: path,
        state: { data: body }
    });
    const classes = useStyles();
    const [openMenu, setOpenMenu] = React.useState(false);

    const handleOpenMenu = () => {
        setOpenMenu(true);
    };
    const handleCloseMenu = () => {
        setOpenMenu(false);
    };

    const [selectedDate, setSelectedDate] = React.useState(new Date());

    const onChangeExamName = (e) => {
        body[e.target.name] = e.target.value;
        console.log(body);
    }

    const onChangeDuration = (e) => {
        body[e.target.name] = e.target.value;
        console.log(body);
    }
    const onChangeQNo = (e) => {
        body[e.target.name] = e.target.value;
        console.log(body);
    }

    const handleDateChange = (date) => {
        setSelectedDate(date);
        body["startTime"] = date;
        console.log(body);
    };

    const createCourse = async (e) => {
        // body["items"].push([{
        //     name,
        //     questionNo: qNo,
        //     duration
        // }])
        e.preventDefault();
        body["courseId"] = courseId;
        console.log(body);
        // const error = await CourseService.createCourse(body, authToken);

        navigateTo(`../../Instructor/Course/${courseId}/Paper`);
    }

    const deleteExam = (event, examId) => {
        if (window.confirm('Are you sure you wish to delete this item?')) {
            ExamService.deleteExam(examId, authToken).then(res => {
                console.log(res);

                // if (res.success)
                //Print message deleted
                //Reload page
                // else
                //Print error message
            })
        }
    }

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
                                    <Grid container>
                                        <img src={logoImg} alt="logo" className={classes.logoImg} />
                                        <Typography variant="h6" color="inherit" noWrap>
                                            {course ? course["courseName"].toUpperCase() : "EXAMINATOR"}
                                        </Typography>
                                    </Grid>
                                </div>
                                <div>
                                    <Button raised className={classes.button} onClick={handleOpenMenu}>
                                        <AccessTimeIcon className={classes.scheduleIcon} />
                                        <Typography className={classes.buttonText} >
                                            Schedule Exam
                                        </Typography>
                                    </Button>
                                </div>
                            </Grid>
                        </Toolbar>
                    </AppBar>
                    <div className={classes.root}>
                        <Container className={classes.cardGrid}>
                            <Typography variant="h4">
                                Scheduled Exams
                            </Typography>
                            <br />
                            <Divider variant="middle" />
                            <br />

                            {examData.length === 0 ?
                                <Grid container spacing={4} justify="center">
                                    <h4>No Scheduled Exams found</h4>
                                </Grid>
                                :
                                <Grid container spacing={4} justify="center">
                                    {examData.map((exam, i) => (
                                        <div key={i} className={classes.cardDiv}>
                                            <Card className={classes.card} elevation="7">
                                                <ButtonBase className={classes.cardMargin}
                                                    onClick={event => { navigateTo(`../Course/Exam/${exam._id}`) }}
                                                >
                                                    <CardContent justify="center">
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
                                                <CardActions>
                                                    <Grid container spacing={2}
                                                        justify='space-between'
                                                        alignItems='center'
                                                    >
                                                        <IconButton className={classes.editClass}>
                                                            <EditIcon />
                                                        </IconButton>
                                                        <IconButton className={classes.deleteClass} onClick={event => deleteExam(event, exam._id)}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Grid>
                                                </CardActions>
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

                            {prevExam.length === 0 ?
                                <Grid container spacing={4} justify="center">
                                    <h4>No previous Exam yet</h4>
                                </Grid>
                                :
                                <Grid container spacing={4} justify="center">
                                    {prevExam.map((exam, i) => (
                                        <div key={i} className={classes.cardDiv}>
                                            <Card className={classes.card} elevation="7">
                                                <ButtonBase className={classes.cardMargin}
                                                    onClick={event => { navigateTo(`../Course/${courseId}/Exam/Result/${exam._id}`) }}
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
                                </Grid>}

                        </Container>
                    </div>
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={classes.modal}
                        open={openMenu}
                        onClose={handleCloseMenu}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={openMenu}>
                            <div className={classes.paper}>
                                <h2 id="transition-modal-title">Schedule Exam</h2>
                                <form className={classes.form} onSubmit={createCourse}>
                                    <TextField
                                        className={classes.textField}
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="standard-basic"
                                        label="Exam Name"
                                        autoComplete="off"
                                        autoFocus
                                        name="name"
                                        onChange={onChangeExamName}
                                    />
                                    <Grid container justify='center' alignItems='center'>
                                        <Grid item xs={6} style={{ paddingRight: 10 }}>
                                            <TextField
                                                className={classes.textField}
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="standard-basic"
                                                label="No of Questions"
                                                type='number'
                                                autoComplete="off"
                                                name="qCount"
                                                onChange={onChangeQNo}
                                            />
                                        </Grid>
                                        <Grid item xs={6} style={{ paddingLeft: 10 }}>
                                            <TextField
                                                className={classes.textField}
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="standard-basic"
                                                label="Duration"
                                                autoComplete="off"
                                                name="duration"
                                                onChange={onChangeDuration}
                                            />
                                        </Grid>
                                    </Grid>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <Grid container justify='space-between' alignItems='center'>
                                            <div style={{ paddingRight: 10 }}>
                                                <KeyboardDatePicker
                                                    margin="normal"
                                                    id="date-picker-dialog"
                                                    label="Exam Date"
                                                    format="MM/dd/yyyy"
                                                    name="date"
                                                    className={classes.textField}
                                                    inputVariant="outlined"
                                                    value={selectedDate}
                                                    onChange={handleDateChange}
                                                    KeyboardButtonProps={{
                                                        'aria-label': 'change date',
                                                    }}
                                                />
                                            </div>
                                            <div style={{ paddingLeft: 10 }}>
                                                <KeyboardTimePicker
                                                    margin="normal"
                                                    id="time-picker"
                                                    label="Exam Time"
                                                    name="time"
                                                    inputVariant="outlined"
                                                    className={classes.textField}
                                                    value={selectedDate}
                                                    onChange={handleDateChange}
                                                    KeyboardButtonProps={{
                                                        'aria-label': 'change time',
                                                    }}
                                                />
                                            </div>


                                        </Grid>
                                    </MuiPickersUtilsProvider>
                                    <br />
                                    <Grid container spacing={2} justify='space-between' alignItems='center'>
                                        <Button
                                            variant="contained"
                                            color="secondary.dark"
                                            className={classes.button}
                                            style={{ width: '48%' }}
                                            onClick={handleCloseMenu}
                                        >
                                            Close
                                    </Button>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            style={{ width: '48%' }}
                                            type="submit"
                                            className={classes.button}
                                        // onClick={createCourse}
                                        >
                                            Save
                                    </Button>
                                    </Grid>
                                </form>

                            </div>
                        </Fade>
                    </Modal>
                    {/* Footer */}
                    <Footer />
                    {/* End footer */}
                </div>
            }
        </React.Fragment>
    );
}
