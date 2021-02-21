import React from 'react';

import AppBar from './Components/AppBar';
import ScheduleButton from './ScheduleButton';
import PaperButton from './PaperButton';

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
    },
}));


export default function Course() {

    const classes = useStyles();

    return (
        <React.Fragment>
            <AppBar />
            

            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        Question Paper
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Paper className={classes.paper}>xs=12 sm=6</Paper>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Paper className={classes.paper}>xs=12 sm=6</Paper>
                            </Grid>
                        </Grid>

                        <Paper className={classes.paper}>
                            <PaperButton />
                        </Paper>

                    </Grid>
                    <Grid item xs={12} sm={6}>
                        Scheduled Exam
                        <Grid container spacing={2}>
                         <Grid item xs={12} sm={6}>
                            <Paper className={classes.paper}>xs=12 sm=6</Paper>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Paper className={classes.paper}>xs=12 sm=6</Paper>
                        </Grid>   
                        </Grid>
                        
                        <Paper className={classes.paper}>
                            <ScheduleButton />
                        </Paper>
                        
                    </Grid>
                </Grid>
            </div>

        </React.Fragment>  
    );
}
