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

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import logoImg from './../../assets/navbar-2.png';

import { useHistory, useParams, } from 'react-router-dom';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData("Saify", 20, 30,"05/07/2021 1:56 AM"),
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
    }

}));


export default function Result() {


    const history = useHistory();
    const navigateTo = (path) => history.push(path);

    const [course, setCourse] = React.useState("");

    const courseId = useParams().course;
    const authToken = localStorage.getItem('auth-token');

    useEffect(() => {
        CourseService.getCourse(courseId, authToken, false).then((courseFromDb) => {
            console.log(courseFromDb);
            setCourse(courseFromDb);
            // course = courseFromDb;
        });
    }, []);


    const classes = useStyles();


    var data = new FormData();

    return (
        <React.Fragment>
            <AppBar position="relative">
                <Toolbar>
                    <Grid container spacing={2} justify='space-between' alignItems='center'>
                        <div>
                            <Grid container>
                                <img src={logoImg} alt="logo" className={classes.logoImg} />
                                <Typography variant="h6" color="inherit" noWrap>
                                    Robotic Vision
                                </Typography>
                            </Grid>
                        </div>
                    </Grid>
                </Toolbar>
            </AppBar>
            <CssBaseline />
            <Container fixed>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Student Names</TableCell>
                                <TableCell align="right">Obtained Marks</TableCell>
                                <TableCell align="right">Total Marks</TableCell>
                                <TableCell align="right">Submitted at</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.calories}</TableCell>
                                    <TableCell align="right">{row.fat}</TableCell>
                                    <TableCell align="right">{row.carbs}</TableCell>
                                    <TableCell align="right">{row.protein}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </React.Fragment>
    )
};