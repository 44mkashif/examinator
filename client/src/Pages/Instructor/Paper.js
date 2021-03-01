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
    margin: {
        marginTop: 20,
        marginBottom: 20,
    },
    button: {
        borderRadius: 100,
        marginButtom: '30px',
        width: "50%"
    }
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
                <Grid container justify="center">
                    <Grid item >
                        {questions}
                    </Grid>
                
                </Grid>
                
                <Grid container justify="center" className={classes.margin} >
                    <Button 
                        variant="contained" color="primary" 
                        className={classes.button}
                        style={{width:'20%'}} 
                        component={Link} to="/Instructor/dashboard">
                        Save
                    </Button>
                </Grid>

            </div>
            
        </React.Fragment>
        
    );
}