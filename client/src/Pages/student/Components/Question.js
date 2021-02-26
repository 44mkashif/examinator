import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    text: {
        userSelect: 'none'
    },
    button: {
        borderRadius: 100,
    }
}));

export default function Question() {
    const classes = useStyles();

    const [value, setValue] = React.useState('');

    const handleChange = (event) => {
        console.log(event.target.value);
        setValue(event.target.value);
    };

    return (
        <div>

            <Paper className={classes.paper}>
                <FormControl component="fieldset">
                    <FormLabel component="legend">
                        What is the best case time complexity of deleting a node in a Singly Linked list?
                                </FormLabel>
                    <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                        <FormControlLabel value="O(logn)" control={<Radio />} label="O (nlogn)" />
                        <FormControlLabel value="O(1)" control={<Radio />} label="O (1)" />
                    </RadioGroup>
                </FormControl>
                <Grid container justify="center" >
                    <Button variant="contained" color="primary" className={classes.button} >
                    Save & Next
                    </Button>
                </Grid>
            </Paper>
        </div>
    )
}
