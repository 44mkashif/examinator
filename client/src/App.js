import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import bgImage from './assets/cover.png';
import logo from './assets/logo-dark.png';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    // backgroundImage: `url(${bgImage})`,
    // paddingTop: '70px',
    backgroundSize: '100% 100%',
    overflowY: 'hidden'
  },
  leftContainer: {
    height: '100vh',

  },
  rightContainer: {
    height: '100vh'
  },
  cover: {
    height: '50%'
  },
  logo: {
    height: '190px',
    width: '190px'
  },
  round: {
    borderTopRightRadius: 500,
    borderBottomRightRadius: 500,
    backgroundColor: theme.palette.primary.main,
    transform: 'scale(2,2) translateX(-200px)',
  },
  mobile: {
    backgroundColor: theme.palette.primary.main,
  },
  paper: {
    margin: theme.spacing(0, 4),
    marginTop: '25vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '30vh',
    transform: 'scale(0.5,0.5) translateX(+380px)'
  },
  button: {
    margin: theme.spacing(5, 3, 5),
    height: '5vh',
    width: '28vh',
    borderWidth: '3px',
    boxShadow: '2px 2px 5px',
    borderRadius: 100,
    backgroundColor: "white",
  },

  text: {
    color: '#fff',
    margin: theme.spacing(0, 0, 5),
  },
  padding: {
    paddingLeft: '90px',
    paddingRight: '90px'

  }
}));

function App() {

  const classes = useStyles();
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 1200);

  React.useEffect(() => {
    window.addEventListener("resize", () => {
      const ismobile = window.innerWidth < 1200;
      if (ismobile !== isMobile) setIsMobile(ismobile);
    }, false);
  }, [isMobile]);

  return (
    <div className="App">
      <Grid container component="main">
        <Grid xs={12} sm={7} className={classes.leftContainer} >
          <Grid container justify="left" className={classes.root} >
            {/* <CssBaseline /> */}
            <Grid item elevation={6} className={`${!isMobile ? classes.round : classes.mobile}`}>
              <div className={`${!isMobile ? classes.paper : ""}`}>
                <Grid container justify="center" className={classes.text}>
                  <div>
                    <img className={classes.logo} src={logo} alt="" />
                  </div>
                </Grid>
                <Grid container justify="center" className={classes.text}>
                  <Typography className="intro" variant='h3'>
                    EXAMINATOR
                  </Typography>
                </Grid>
                <Grid container justify="center" className={classes.padding}>
                  <Button
                    variant="contained"
                    className={classes.button}
                    component={Link} to="/Student/Login"
                  >
                    Student Portal
                  </Button>
                  <Button
                    variant="contained"
                    className={classes.button}
                    component={Link} to="/Instructor/login"
                  >
                    Instructor Portal
                  </Button>

                </Grid>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Box display={{ xs: 'none', sm: 'none', md: 'block' }}>
          <Grid item xs={12} sm={5} container alignItems="center" className={classes.rightContainer}>
            <img className={classes.cover} src={bgImage} alt="" />
          </Grid>
        </Box>
      </Grid>
    </div>

  );
}

export default App;