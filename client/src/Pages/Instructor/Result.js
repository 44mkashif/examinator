import React, { useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CourseService from './../../services/CourseService';
import ResultService from './../../services/ResultService';
import StudentService from './../../services/StudentService';
import theme from './../../theme';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import logoImg from './../../assets/navbar-2.png';

import { useHistory, useParams, } from 'react-router-dom';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData("Saify", 20, 30, "05/07/2021 1:56 AM"),
    createData("Kashi", 16, 30, "05/07/2021 1:57 AM"),
    createData("Munam", 16, 30, "05/07/2021 1:58 AM"),
    createData("Boogey", 15.5, 30, "05/07/2021 1:59 AM"),
];

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
    logoImg: {
        width: 40,
        marginRight: 10
    },
    table: {
        minWidth: 650,
    },
    loader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '350px'
    }

}));

var examRoom;
var course;
var results;
var students = [];

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

export default function Result() {

    examRoom = useParams().exam;
    const history = useHistory();
    const navigateTo = (path) => history.push(path);
    const [loading, setLoading] = React.useState(false);

    const courseId = useParams().course;
    const authToken = localStorage.getItem('auth-token');

    useEffect(() => {
        CourseService.getCourse(courseId, authToken, false).then((courseFromDb) => {
            course = courseFromDb;
            console.log("Course: ", course);
        });

        ResultService.getResults(examRoom, authToken).then(res => {
            // console.log(res);
            results = res;

            students = [];

            if (results && results.length > 0) {
                var requests = [];
                results.forEach(result => {
                    requests.push(fetchStudents(result.studentId));
                });

                Promise.all(requests).then(() => {
                    console.log("students: ", students);
                    console.log("Loading finished");
                    setLoading(true);
                })
            } else {
                setLoading(true);
            }
        })

    }, []);

    const fetchStudents = (studentId) => {
        return new Promise(resolve => {
            StudentService.getStudent(studentId, authToken)
                .then(student => {
                    students.push(student);
                })
                .then((data) => {
                    resolve(data);
                })
                .catch((e) => {
                    console.log(e);
                });
        })
    }


    const classes = useStyles();


    var data = new FormData();

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
                                            {course ? course.courseName.toUpperCase() : "EXAMINATOR"}
                                        </Typography>
                                    </Grid>
                                </div>
                            </Grid>
                        </Toolbar>
                    </AppBar>
                    <CssBaseline />
                    {results && results.length > 0 ?
                        <Container fixed>
                            <TableContainer component={Paper}>
                                <Table className={classes.table} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Name</TableCell>
                                            <TableCell align="center">Reg No #</TableCell>
                                            <TableCell align="center">Obtained Marks</TableCell>
                                            <TableCell align="center">Total Marks</TableCell>
                                            <TableCell align="right">Submitted at</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {results.map((result, i) => (
                                            <TableRow key={result.studentId}>
                                                <TableCell component="th" scope="row">
                                                    {students[i].fName} {students[i].lName}
                                                </TableCell>
                                                <TableCell align="center">{students[i].regNo}</TableCell>
                                                <TableCell align="center">{result.obtainedMarks}</TableCell>
                                                <TableCell align="center">{result.totalMarks}</TableCell>
                                                <TableCell align="right">{processDate(result.createdAt)}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Container>
                        :
                        <div>No Results Found</div>
                    }
                </div>
            }
        </React.Fragment>
    )
};