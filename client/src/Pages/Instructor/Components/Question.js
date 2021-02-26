import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
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

      },
}));

export default function Question() {
    const classes = useStyles();

    const [option, setoption] = React.useState('');

    const handleChange = (event) => {
        setoption(event.target.value);
    };

    return (
        <div>
            
                <Paper className={classes.paper}>
                    <div>
                        <TextField
                            id="outlined-full-width"
                            label={"Question"}
                            // style={{ marginRight: 8 }}
                            placeholder="What is what in what?"
                            fullWidth
                            margin="normal"
                            
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
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
                                    fullWidth
                                />
                                <br />
                            </Grid>
                            <Grid>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">Correct Answer</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={option}
                                    onChange={handleChange}
                                    label="Correct Answer"
                                    className={classes.textField}
                                >
                                    <MenuItem value="">
                                        <em>Select Correct Option</em>
                                    </MenuItem>
                                    <MenuItem value={'1'}>Option A</MenuItem>
                                    <MenuItem value={'2'}>Option B</MenuItem>
                                    <MenuItem value={'3'}>Option C</MenuItem>
                                    <MenuItem value={'4'}>Option D</MenuItem>
                                </Select>
                            </FormControl>
                            </Grid>
                        </Grid>  
                    </div>
                </Paper>
        </div>
    )
}
