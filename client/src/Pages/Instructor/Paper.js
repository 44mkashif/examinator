import AppBar from './Components/AppBar';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import CourseService from './../../services/CourseService';
import ExamService from './../../services/ExamService';
import { useHistory } from 'react-router-dom';
import { Alert, AlertTitle } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    margin: {
        marginTop: 20,
        marginBottom: 20,
    },
    button: {
        borderRadius: 100,
        marginButtom: '30px',
        marginLeft: '20px'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        marginTop: '30px'

    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
        justifyContent: 'end'

    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    textField: {
        [`& fieldset`]: {
            borderRadius: 100,
            borderWidth: '2px'
        }

    }
}));

var qComponents = [];
var questions = [];
var cOptions = [];

const authToken = localStorage.getItem('auth-token');
var error;

export default function SimplePaper() {
    const classes = useStyles();

    const location = useLocation();

    const [Checksuccess, setChecksuccess] = React.useState(false);
    const [Checkfail, setCheckfail] = React.useState(false);

    const data = location.state.data;

    if (questions.length === 0) {
        for (var i = 0; i < data['qCount']; i++) {
            qComponents.push(i);
            questions.push({
                "statement": "",
                "options": [],
                "correctOption": "",
                "marks": 0
            })
        }
    }

    const history = useHistory();
    const navigateTo = (path) => history.push(path);

    const handleQuestionChange = (e, index) => {
        questions[index][e.target.name] = e.target.value;
        console.log(questions);
    }

    const handleOptionAChange = (e, index) => {
        questions[index]["options"][0] = e.target.value;
        console.log(questions);
    }

    const handleOptionBChange = (e, index) => {
        questions[index]["options"][1] = e.target.value;
        console.log(questions);
    }

    const handleOptionCChange = (e, index) => {
        questions[index]["options"][2] = e.target.value;
        console.log(questions);
    }

    const handleOptionDChange = (e, index) => {
        questions[index]["options"][3] = e.target.value;
        console.log(questions);
    }

    const handleCOptionChange = (e, index) => {
        cOptions[index] = e.target.value
        questions[index][e.target.name] = e.target.value;
        console.log(questions);
    };

    const handleMarksChange = (e, index) => {
        questions[index][e.target.name] = e.target.value;
        console.log(questions);
    };

    const calculateMarks = () => {
        var marks = 0;
        for (var i = 0; i < questions.length; i++) {
            marks += parseInt(questions[i]["marks"]);
        }
        return marks;
    }

    const createExam = async (e) => {
        e.preventDefault();

        console.log(data);
        console.log(questions);

        const exam = {
            "name": data["name"],
            "courseId": data["courseId"],
            "duration": data["duration"],
            "startTime": data["startTime"],
            "totalMarks": calculateMarks(),
            "questions": questions
        };

        console.log(exam);

        const res = await ExamService.createExam(exam, authToken);
        console.log(res);

        console.log(typeof (res["success"]));



        if (res["success"]) {

            console.log(res["success"]);
            setChecksuccess(true);
        } else {
            setCheckfail(true);
            error = res["msg"];
            console.log(res["msg"]);
            console.log(res["success"]);
        }

    }

    return (
        <React.Fragment>
            <AppBar />
            <div className={classes.root}>
                <Grid container justify="center">
                    <Grid item >
                        {qComponents.map((q, index) => (
                            <div>
                                <Paper className={classes.paper}>
                                    <div>
                                        <TextField
                                            id="outlined-full-width"
                                            label={"Question " + (index + 1)}
                                            // style={{ marginRight: 8 }}
                                            placeholder="What is what in what?"
                                            fullWidth
                                            margin="normal"
                                            className={classes.textField}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            name="statement"
                                            variant="outlined"
                                            onChange={(e) => handleQuestionChange(e, index)}

                                        />
                                        <br />
                                        <Grid container spacing={2} justify="center">
                                            <Grid item xs={5}>
                                                <TextField
                                                    label="Option A"
                                                    id="outlined-margin-dense"
                                                    style={{ margin: 8 }}
                                                    className={classes.textField}
                                                    margin="dense"
                                                    variant="outlined"
                                                    name="optionA"
                                                    onChange={(e) => handleOptionAChange(e, index)}
                                                    fullWidth
                                                />
                                                <br />
                                            </Grid>
                                            <Grid item xs={5}>
                                                <TextField
                                                    label="Option B"
                                                    id="outlined-margin-dense"
                                                    style={{ margin: 8 }}
                                                    className={classes.textField}
                                                    margin="dense"
                                                    variant="outlined"
                                                    name="optionB"
                                                    onChange={(e) => handleOptionBChange(e, index)}
                                                    fullWidth
                                                />
                                                <br />
                                            </Grid>
                                            <Grid item xs={5}>
                                                <TextField
                                                    label="Option C"
                                                    id="outlined-margin-dense"
                                                    style={{ margin: 8 }}
                                                    className={classes.textField}
                                                    margin="dense"
                                                    variant="outlined"
                                                    name="optionC"
                                                    onChange={(e) => handleOptionCChange(e, index)}
                                                    fullWidth
                                                />
                                                <br />
                                            </Grid>
                                            <Grid item xs={5}>
                                                <TextField
                                                    label="Option D"
                                                    id="outlined-margin-dense"
                                                    className={classes.textField}
                                                    style={{ margin: 8 }}
                                                    margin="dense"
                                                    variant="outlined"
                                                    name="optionD"
                                                    onChange={(e) => handleOptionDChange(e, index)}
                                                    fullWidth
                                                />
                                                <br />
                                            </Grid>
                                            <Grid container spacing={2} justify="center" alignItems="center">
                                                <Grid item >
                                                    <FormControl variant="outlined" className={classes.formControl}>
                                                        <InputLabel id="demo-simple-select-outlined-label">Correct Answer</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-outlined-label"
                                                            id="demo-simple-select-outlined"
                                                            value={cOptions[index]}
                                                            onChange={(e) => handleCOptionChange(e, index)}
                                                            label="Correct Answer"
                                                            name="correctOption"
                                                            className={classes.textField}                                           >
                                                            <MenuItem value="">
                                                                <em>Select Correct Option</em>
                                                            </MenuItem>
                                                            <MenuItem value={'0'}>Option A</MenuItem>
                                                            <MenuItem value={'1'}>Option B</MenuItem>
                                                            <MenuItem value={'2'}>Option C</MenuItem>
                                                            <MenuItem value={'3'}>Option D</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item>
                                                    <TextField
                                                        label="Marks"
                                                        id="outlined-margin-dense"
                                                        className={classes.textField}
                                                        variant="outlined"
                                                        align="center"
                                                        name="marks"
                                                        onChange={(e) => handleMarksChange(e, index)}

                                                    />
                                                    <br />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </Paper>
                            </div>
                        ))}
                    </Grid>

                </Grid>

                <Grid container justify="center" className={classes.margin} >
                    <Button
                        variant="contained" color="primary"
                        className={classes.button}
                        style={{ width: '20%' }}
                        onClick={createExam}
                    >
                        Save
                    </Button>
                </Grid>

                <Grid container spacing={3} justify="center" style={{ marginTop: '50px' , marginBottom: '20px' }}>


                    {Checksuccess &&
                        
                        <Alert severity="success" action={
                            <Button variant="contained" color="primary" className={classes.button} onClick={event => { navigateTo(`/Instructor/dashboard`) }}>
                                Return to Dashboard
                            </Button>
                        }>
                            
                        
                            <AlertTitle>Success</AlertTitle>
                            <strong> Your Exam has been successfully Scheduled </strong>
                        </Alert>

                    }

                    {
                        Checkfail &&
                        <Alert severity="error">
                            <AlertTitle>Error</AlertTitle>
                            <strong> {error} </strong>
                        </Alert>
                    }
                </Grid>

            </div>

        </React.Fragment>

    );
}