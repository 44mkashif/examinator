import React from 'react';
import logo from './../../assets/logo-light.png';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import bgImage from './../../assets/studentLogin.jpg';
import AuthService from '../../services/AuthService';
import { useState } from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import Footer from '../Components/Footer';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Examinator
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    overflowY: 'hidden',
    backgroundSize: '100% 100%',
    backgroundImage: `url(${bgImage})`,
  },
  image: {
    backgroundImage: 'url(https://www.sainte-marie.ca/wp-content/uploads/2020/03/livre_numerique_shutterstock_1161966886.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  round: {
    borderTopRightRadius: 500,
    borderBottomRightRadius: 500,
    // backgroundColor: theme.palette.primary.main,
    transform: 'scale(2,2) translateX(-100px)',
  },
  mobile: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    transform: 'scale(0.5,0.5) translateX(+250px)'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  logo: {
    height: '100px',
    width: '100px'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  textField: {
    [`& fieldset`]: {
      borderRadius: 100,
      borderWidth: '2px'
    },

  },

  submit: {
    margin: theme.spacing(3, 0, 2),
    borderRadius: 100,
  },
}));


export default function Login() {

  const classes = useStyles();
  const [errorMessage, setErrorMessage] = React.useState("");
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 1200);

  var body = {}

  const studentLogin = async (e) => {
    e.preventDefault();
    const error = await AuthService.studentLogin(body);
    setErrorMessage(error);
  }

  const onEmailChange = (e) => {
    body[e.target.name] = e.target.value;
  }

  const onPasswordChange = (e) => {
    body[e.target.name] = e.target.value;
  }

  React.useEffect(() => {
    window.addEventListener("resize", () => {
      const ismobile = window.innerWidth < 1200;
      if (ismobile !== isMobile) setIsMobile(ismobile);
    }, false);
  }, [isMobile]);

  return (
    <React.Fragment>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={5} component={Paper} container alignItems="center"
          justify="center" elevation={6} square className={`${!isMobile ? classes.round : ""}`}>
          <div className={`${!isMobile ? classes.paper : classes.mobile}`}>
            <div>
              <img className={classes.logo} src={logo} alt="" />
            </div>

            <Typography component="h1" variant="h5">
              Student Sign In
          </Typography>
            <form className={classes.form} noValidate onSubmit={studentLogin}>
              <TextField
                className={classes.textField}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={onEmailChange}
              />
              <TextField
                className={classes.textField}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={onPasswordChange}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
            </Button>
              {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
              {errorMessage &&
                <Box mt={5}>
                  <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {errorMessage}
                  </Alert>
                </Box>
              }
              {/* Footer */}
              <Footer />
              {/* End footer */}
            </form>
          </div>
        </Grid>
        {/* <Grid item xs={false} sm={4} md={7} className={classes.image} /> */}
      </Grid>
    </React.Fragment>
  );
}