import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        paddingLeft: 40,
        color: theme.palette.text.secondary,
        userSelect: 'none'
    },
    text: {
        userSelect: 'none'
    },
    button: {
        borderRadius: 100,
    }
}));

export default function Question(props) {
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
                        {props.question}
                    </FormLabel>
                    <RadioGroup aria-label="answer" name="answer1" value={value} onChange={handleChange}>
                        <FormControlLabel value={props.options[0]} control={<Radio />} label={props.options[0]} />
                        <FormControlLabel value={props.options[1]} control={<Radio />} label={props.options[1]} />
                        <FormControlLabel value={props.options[2]} control={<Radio />} label={props.options[2]} />
                        <FormControlLabel value={props.options[3]} control={<Radio />} label={props.options[3]} />
                    </RadioGroup>
                </FormControl>
                {/* <Grid container justify="center" >
                    <Button variant="contained" color="primary" className={classes.button} >
                        Save & Next
                    </Button>
                </Grid> */}
            </Paper>
        </div>
    )
}
