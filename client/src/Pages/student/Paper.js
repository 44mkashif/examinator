import AppBar from './Components/AppBar'; 
import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import Grid from '@material-ui/core/Grid';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

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

    const [value, setValue] = React.useState('female');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <React.Fragment>
            <AppBar/>
            <div className={classes.root}>
                <Grid container spacing={3} justify="center">
                    <Grid item xs={8}>
                        <Paper >
                            <FormControl component="fieldset">
                                <FormLabel component="legend">What is the best case time complexity of deleting a node in a Singly Linked list? 
                                O (n)
                                b) O (n2)
                                </FormLabel>
                                <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                                    <FormControlLabel value="O (nlogn)" control={<Radio />} label="O (nlogn)" />
                                    <FormControlLabel value="O (1)" control={<Radio />} label="O (1)" />
                                </RadioGroup>
                            </FormControl>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
            
        </React.Fragment>
        
    );
}