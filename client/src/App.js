import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import { Link } from 'react-router-dom';
import bgImage from './assets/cover.jpg';
import logo from './assets/examinator-logo.jpeg';
import 'fontsource-roboto';
import Avatar from '@material-ui/core/Avatar';


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    backgroundImage: `url(${bgImage})`,
    paddingTop: '70px',
    backgroundSize: '100% 100%'
  },
  logo: {
    height: '190px',
    width: '190px'
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '30vh'
  },
  avatar: {
    margin: theme.spacing(1),
    height: '190px',
    width: '190px',
    backgroundColor: theme.palette.secondary.main,
  },
  button: {
    margin: theme.spacing(5, 3, 5),
    height: '5vh',
    width: '20vh',
    borderWidth: '3px', 
    boxShadow: '1px 2px 4px'
    // borderRadius: '10%'
  },

  text: {
    margin: theme.spacing(0, 0, 5),
  }
}));

function App() {

  const classes = useStyles();
  

  return (
    <div className="App">
      <Grid container justify="left" component="main" className={classes.root}>
        <CssBaseline />
        <Grid item elevation={6}>
          <div className={classes.paper}>
            <Grid container justify="center" className={classes.text}>
              <Avatar className={classes.avatar}>
                <img className={classes.logo} src={logo} alt=""/>
              </Avatar>
            </Grid>
            <Grid container justify="center" className={classes.text}>
              <Typography className="intro" color="primary" variant='h3'>
                EXAMINATOR
              </Typography>
            </Grid>
            <Grid container justify="center" >
              <Button
                variant="outlined"
                color="primary"
                className={classes.button}
                component={Link} to="/student/login"
              >
                Student Portal
              </Button>
              <Button
                variant="outlined"
                color="primary"
                className={classes.button}
                component={Link} to="/teacher/login"
              >
                Teacher Portal
              </Button>
              <Button
                variant="outlined"
                color="primary"
                className={classes.button}
                component={Link} to="/admin/login"
              >
                Admin Portal
              </Button>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </div>

  );
}

export default App;