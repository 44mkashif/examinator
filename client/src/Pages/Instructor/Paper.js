import AppBar from './Components/AppBar'; 
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Question from './Components/Question';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    }));

var questionNum = 5;


export default function SimplePaper() {
    const classes = useStyles();

    var questions = [];
    for (var i = 0; i < questionNum; i++) {
        questions.push(<Question/>);
    }

    return (
        <React.Fragment>
            <AppBar/>
            <div className={classes.root}>
                <Grid container spacing={3} justify="center">
                    <Grid item xs={8} >
                        {questions}
                    </Grid>
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