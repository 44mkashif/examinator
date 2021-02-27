import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { useHistory } from 'react-router-dom';
import logoImg from './../../assets/navbar-2.png';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    logoImg: {
        width: 40,
        marginRight: 10
    },
    card: {
        width: 300,
        margin: theme.spacing(1, 3, 2),
        // display: 'flex',
        // flexDirection: 'column',
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },

}));

var exams = ['Midterm', 'Final Term'];

export default function Course() {

    const history = useHistory();
    const navigateTo = (path) => history.push(path);
    const classes = useStyles();

    return (
        <React.Fragment>
            <AppBar position="relative">
                <Toolbar>
                    <Grid container spacing={2} justify='space-between' alignItems='center'>
                        <div>
                            <Grid container>
                                <img src={logoImg} alt="logo" className={classes.logoImg} />
                                <Typography variant="h6" color="inherit" noWrap>
                                Introduction to Data Science
                                </Typography>
                            </Grid>
                        </div>
                    </Grid>
                </Toolbar>
            </AppBar>

            <div className={classes.root}>
                <Container className={classes.cardGrid} maxWidth="md">
                    <Grid container spacing={4} justify="center">
                        {exams.map((exam) => (
                            <div key={exam} className={classes.card}>
                                <ButtonBase
                                    onClick={event => { navigateTo('../student/course/ExamInstruction') }}
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
                                    </Card>
                                </ButtonBase>
                            </div>
                        ))}

                    </Grid>
                </Container>
            </div>

        </React.Fragment>
    );
}
