import React from 'react';
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
        marginLeft: 50,
        paddingTop: 20
    },
    content: {
        fullWidth: 100,
    },
    scheduleClass: {
        color: theme.palette.secondary.dark,
        marginRight: 5
    }
}));

var s = [];
var d = [];
var t = [];

var examData = [];

export default function Course() {

    const history = useHistory();
    const navigateTo = (path) => history.push(path);
    const classes = useStyles();

    const [loading, setLoading] = React.useState(false);

    const courseId = useParams().course;
    const authToken = localStorage.getItem('auth-token');

    var course;

    CourseService.getCourse(courseId, authToken, false).then((courseFromDb) => {
        console.log(courseFromDb);
        course = courseFromDb; 
    });

    ExamService.getExams(courseId, authToken).then((examsFromDb) => {
        console.log(examsFromDb);

        examData = [];

        examsFromDb.forEach((e) => {
            examData.push(e);
        })

        for (var i = 0; i < examData.length; i++) {
            s[i] = (examData[i].startTime).toString();
            d[i] = s[i].substring(0, 10);
            t[i] = s[i].substring(11, 19);
        }

        setLoading(true);

    })

    return (
        <React.Fragment>
            <AppBar position="relative">
                <Toolbar>
                    <Grid container spacing={2} justify='space-between' alignItems='center'>
                        <div>
                            <Grid container>
                                <img src={logoImg} alt="logo" className={classes.logoImg} />
                                <Typography variant="h6" color="inherit" noWrap>
                                    Introduction to Data Science
                                </Typography>
                            </Grid>
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
                        {examData.map((exam, i) => (
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
                                                    {d[i]}
                                                </Typography>
                                            </Grid>
                                            <Grid container justify="center">
                                                <AccessTimeIcon className={classes.iconClass} />
                                                <Typography className={classes.margin}>
                                                    {t[i]}
                                                    </Typography>
                                            </Grid>
                                        </CardContent>
                                    </ButtonBase>
                                </Card>

                            </div>
                        ))}

                    </Grid>

                    <Typography>
                        Previous Exams
                    </Typography>

                    <br />
                    <Divider variant="middle" />
                    <br />

                </Container>
            </div>
            {/* Footer */}
            <Footer />
            {/* End footer */}
        </React.Fragment>
    );
}
