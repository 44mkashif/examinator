import React from 'react';

import AppBar from './Components/AppBar';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Container from '@material-ui/core/Container';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import ButtonBase from '@material-ui/core/ButtonBase';

import { useHistory } from 'react-router-dom';

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

var exams = ['Midterm', 'Final Term'];

export default function Course() {

    const history = useHistory();
    const navigateTo = (path) => history.push(path);
    const classes = useStyles();

    return (
        <React.Fragment>
            <AppBar />


            <div className={classes.root}>
                <Container className={classes.cardGrid} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {exams.map((exam) => (

                            <Grid item key={exam} xs={12} sm={6} md={4}>
                                <ButtonBase
                                    onClick={event => { navigateTo('../student/course/exam') }}
                                >
                                    <Card className={classes.card}>
                                        <CardContent className={classes.cardContent}>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {exam}
                                            </Typography>
                                            <Typography>
                                                12/12/21 10:00 PM
                                            </Typography>
                                        </CardContent>
                                        {/* <CardActions>
                    <Button size="small" color="primary">
                    Course
                    </Button>
                    <Button size="small" color="primary">
                    Exam Schedule
                    </Button>
                  </CardActions> */}
                                    </Card>
                                </ButtonBase>
                            </Grid>
                        ))}

                    </Grid>
                </Container>
            </div>

        </React.Fragment>
    );
}
