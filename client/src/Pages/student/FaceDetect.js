import React from 'react';
import AppBar from './Components/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';
import { useHistory } from 'react-router-dom';

import FaceDetect from '../../assets/Face.png';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    card: {
        width: 300,
        margin: theme.spacing(1, 3, 2),
        // display: 'flex',
        // flexDirection: 'column',
    },
}));



export default function Testpage() {

    const [activebutton, setButton] = React.useState(false);
    const [displayValidity, setValidity] = React.useState(true);

    const history = useHistory();
    const navigateTo = (path) => history.push(path);

    const classes = useStyles();

    const videoRef = React.useRef(null);
    const remoteVideoRef = React.useRef(null);

    const renderValidity = () => {
        return (
            <div className={classes.root}>
                <Grid container spacing={2} align='center' >
                    <Card className={classes.card} elevation="7">
                        <ButtonBase className={classes.cardMargin}

                            onClick={event => {
                                setButton(true)
                                setValidity(false);
                            }}>

                            <CardContent className={classes.cardContent}>
                                <img src={FaceDetect} width="100" height="100" />

                                <Typography>Verify Your Identity</Typography>

                            </CardContent>

                        </ButtonBase>
                    </Card>
                </Grid>
            </div>
        );
    }

    const renderVideo = () => {
        return (
            <div className="videos">
                <Grid container spacing={2} align='center' >
                    <Card className={classes.card} elevation="7">
                        <ButtonBase className={classes.cardMargin}

                            onClick={event => { navigateTo('') }}>

                            <CardContent className={classes.cardContent}>
                                <img src={FaceDetect} width="100" height="100" />

                                <Typography>Video Feed</Typography>

                            </CardContent>

                        </ButtonBase>
                    </Card>
                </Grid>
            </div>
        );
    }



    return (


        <React.Fragment>
            <AppBar />
            <CssBaseline />
            <Container fixed>
                {!!displayValidity ? renderValidity() : null}
                {!!activebutton ? renderVideo() : null}


            </Container>
        </React.Fragment>
    )
};
