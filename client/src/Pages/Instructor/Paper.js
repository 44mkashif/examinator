import AppBar from './Components/AppBar'; 
import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import Grid from '@material-ui/core/Grid';

import TextField from '@material-ui/core/TextField';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';

import Button from '@material-ui/core/Button';

import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,

    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
        justifyContent:'end'
        
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    }));

var questions = [1, 2, 3, 4];



export default function SimplePaper() {
    const classes = useStyles();

    const [option, setoption] = React.useState('');

    const handleChange = (event) => {
        setoption(event.target.value);
    };

    return (
        <React.Fragment>
            <AppBar/>
            <div className={classes.root}>
                <Grid container spacing={3} justify="center">
                    {questions.map((Question) => (
                    <Grid item xs={8}>
                        <Paper >
                            <div>
                                <TextField
                                    id="outlined-full-width"
                                    label="Question"
                                    // style={{ marginRight: 8 }}
                                    placeholder="What is what in what?"
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                />
                                <br/>
                                <TextField
                                    label="Option A"
                                    id="outlined-margin-dense"
                                    style={{ margin: 8 }}
                                    className={classes.textField}
                                    margin="dense"
                                    variant="outlined"
                                />
                                <br />
                                <TextField
                                    label="Option B"
                                    id="outlined-margin-dense"
                                    style={{ margin: 8 }}
                                    className={classes.textField}
                                    margin="dense"
                                    variant="outlined"
                                />
                                <br />
                                <TextField
                                    label="Option C"
                                    id="outlined-margin-dense"
                                    style={{ margin: 8 }}
                                    className={classes.textField}
                                    margin="dense"
                                    variant="outlined"
                                />
                                <br />
                                <TextField
                                    label="Option D"
                                    id="outlined-margin-dense"
                                    className={classes.textField}
                                    style={{ margin: 8 }}
                                    margin="dense"
                                    variant="outlined"
                                />
                                <br/>
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-outlined-label">Correct Answer</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={option}
                                        onChange={handleChange}
                                        label="Correct Answer"
                                    >
                                        <MenuItem value="">
                                            <em>Select Correct Option</em>
                                        </MenuItem>
                                        <MenuItem value={1}>Option A</MenuItem>
                                        <MenuItem value={2}>Option B</MenuItem>
                                        <MenuItem value={3}>Option C</MenuItem>
                                        <MenuItem value={4}>Option D</MenuItem>

                                    </Select>
                                </FormControl>
                            </div>
                        </Paper>
                    </Grid>
                    ))}
                </Grid>
                
                <div >
                <Button variant="contained" color="primary" 
                        component={Link} to="/Instructor/dashboard">
                Save
                </Button>
                </div>
            </div>
            
        </React.Fragment>
        
    );
}