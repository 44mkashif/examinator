import AppBar from './Components/AppBar'; 
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
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
      //  textAlign: 'center',
        color: theme.palette.text.secondary,
        userSelect: 'none',
        marginTop: '30px'
    },
    text: {
        
    }
}));

var questions = [1, 2, 3, 4];

export default function SimplePaper() {
    const classes = useStyles();

    const [value, setValue] = React.useState('');

    const handleChange = (event) => {
        console.log(event.target.value);
        setValue(event.target.value);
    };
    var mcq = [];
    for (const q of questions ){
        mcq.push(
            <Grid container xs={12}>
                <Grid item xs={8}> 
                    <Paper className={classes.paper}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">
                                {q} What is the best case time complexity of deleting a node in a Singly Linked list?
                                    </FormLabel>
                            <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                <FormControlLabel value="O(logn)" control={<Radio />} label="O (nlogn)" />
                                <FormControlLabel value="O(1)" control={<Radio />} label="O (1)" />
                            </RadioGroup>
                        </FormControl>
                        <Grid container spacing={2} justify='center' alignItems='center'>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                className={classes.button} 
                                style={{width:'20'}} 
                            >
                                Next 
                            </Button>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>xs=4</Paper>
                </Grid>
            </Grid>
        )
    }

    return (
        <React.Fragment>
            <AppBar/>
            <div className={classes.root}>
                <Grid container spacing={3} justify="center">
                {mcq}
{/*                     
                    { questions.map((qstn) => (
                    <Grid item xs={8}>
                        <Paper className={classes.text}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">
                                    {qstn} What is the best case time complexity of deleting a node in a Singly Linked list? 
                                </FormLabel>
                                <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                                        <FormControlLabel value="O(logn)" control={<Radio />} label="O (nlogn)" />
                                        <FormControlLabel value="O(1)" control={<Radio />} label="O (1)" />
                                </RadioGroup>
                            </FormControl>
                        </Paper>
                    </Grid>
                    )) } */}
                </Grid>
            </div>
            
        </React.Fragment>
        
    );
}