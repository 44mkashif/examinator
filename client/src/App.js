import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import { Link } from 'react-router-dom';
import bgImage from './assets/cover.png';
import logo from './assets/logo-dark.png';
import 'fontsource-roboto';


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
    // marginTop: '50vh'
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
  paper: {
    marginLeft: '8px',
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
    width: '25vh',
    borderWidth: '3px',
    boxShadow: '2px 2px 5px',
    borderRadius: 100,
    backgroundColor: "white",
  },

  text: {
    color: '#fff',
    margin: theme.spacing(0, 0, 5),
  }
}));

function App() {

  const classes = useStyles();

  return (
    <div className="App">
      <Grid container component="main">
        <Grid xs={12} sm={7} className={classes.leftContainer}>
          <Grid container justify="left" className={classes.root}>
            {/* <CssBaseline /> */}
            <Grid item elevation={6} className={classes.round}>
              <div className={classes.paper}>
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
                <Grid container justify="center" >
                  <Button
                    variant="contained"
                    className={classes.button}
                    component={Link} to="/student/login"
                  >
                    Student Portal
                  </Button>
                  <Button
                    variant="contained"
                    className={classes.button}
                    component={Link} to="/teacher/login"
                  >
                    Instructor Portal
                  </Button>
                  <Button
                    variant="contained"
                    className={classes.button}
                  // component={Link} to="/admin/login"
                  >
                    Admin Portal
                  </Button>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={5} container alignItems="center" className={classes.rightContainer}>
          <img className={classes.cover} src={bgImage} alt="" />
        </Grid>
      </Grid>
    </div>

  );
}

export default App;