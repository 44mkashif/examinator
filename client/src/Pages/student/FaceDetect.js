import React from 'react';
import AppBar from './Components/AppBar' ;
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';    
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';
import { useHistory, useParams, } from 'react-router-dom';

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
        width: 400,
        margin: theme.spacing(1, 3, 2),
        // display: 'flex',
        // flexDirection: 'column',
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
        
      },
      align: {
          paddingTop: 150
      }
}));



export default function Testpage() {

    const [activebutton, setButton] = React.useState(false);
    const [displayValidity, setValidity] = React.useState(true);

    const history = useHistory();
    const navigateTo = (path) => history.push(path);

    const examRoom = useParams().exam;

    const classes = useStyles();

    const videoRef = React.useRef(null);
    const remoteVideoRef = React.useRef(null);

    const renderValidity = () => {
        return (
            
                < Grid container className={classes.align} align="center" justify="center" direction="column" >        
                    <Grid item l={12} >
                        <Card className={classes.card} elevation="7">
                            <ButtonBase className={classes.cardMargin}
                                onClick={event => {
                                    setButton(true)
                                    setValidity(false);
                                }}>
                                <CardContent className={classes.cardContent}>
                                    <img src={FaceDetect} width="300" height="300" />
                                    <Typography variant="h6">
                                        Verify Your Identity
                                    </Typography>
                                </CardContent>
                            </ButtonBase>
                        </Card>
                    </Grid>                  
                </Grid>
         
        );
    }

    const renderVideo = () => {
        return (
            < Grid container className={classes.align} align="center" justify="center" direction="column" >        
                <Grid item l={12} >
                    <Card className={classes.card} elevation="7">
                        <ButtonBase className={classes.cardMargin}
                            onClick={event => { navigateTo(`./Course/Exam/${examRoom}`) }}>
                            <CardContent className={classes.cardContent}>
                                <img src={FaceDetect} width="300" height="300" />
                                <Typography  variant="h6">
                                    Video Feed
                                </Typography>
                            </CardContent>
                        </ButtonBase>
                    </Card>
                </Grid>
            </Grid>     
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
