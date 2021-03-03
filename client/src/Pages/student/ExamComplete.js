import React from 'react';
import AppBar from './Components/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import Submitted from '../../assets/Submitted.png';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: 50
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function StudentExamComplete() {

    const classes = useStyles();

    return (


        <React.Fragment>
            <AppBar />
            <CssBaseline />
            
            <Container fixed>
                <div className={classes.root}>
                    <Grid container spacing={2} align='center' >
                        <Grid item xs={12}>
                            <img src={Submitted} width="100" height="100" />
                        </Grid>
                            <Grid item xs={12}>
                            
                                <Typography>
                                    Your Exam Have Been Submitted
                                </Typography>
                            </Grid>
                            <Grid  xs={12}>
                                    <Typography>
                                        Your Submission cannot be previewed at this Time
                                </Typography>
                            </Grid>
                    </Grid>
                    </div>
            </Container>
            
        </React.Fragment>
    )
};
