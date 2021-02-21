import AppBar from './Components/AppBar'; 
import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import Grid from '@material-ui/core/Grid';

import TextField from '@material-ui/core/TextField';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,

    },
}));



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
                    <Grid item xs={8}>
                        <Paper >
                            <div>
                                <TextField
                                    id="outlined-full-width"
                                    label="Question"
                                    style={{ margin: 8 }}
                                    placeholder="What is what in what?"
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                />
                                <TextField
                                    label="Option A"
                                    id="outlined-margin-dense"
                                    style={{ margin: 8 }}
                                    className={classes.textField}
                                    margin="dense"
                                    variant="outlined"
                                />
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-outlined-label">option</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={option}
                                        autoWidth
                                        onChange={handleChange}
                                        label="Option"
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
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
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
            
        </React.Fragment>
        
    );
}