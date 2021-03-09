import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ButtonBase from '@material-ui/core/ButtonBase';
import { useHistory } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import courseImage from './../../assets/course.jpg';
import Toolbar from '@material-ui/core/Toolbar';
import logoImg from './../../assets/navbar-2.png';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AuthService from '../../services/AuthService';
import CourseService from '../../services/CourseService';



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
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    width: 300,
    margin: theme.spacing(1, 3, 2),
    // display: 'flex',
    // flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
    backgroundImage: `url(${courseImage})`,
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  logoImg: {
    width: 35,
    marginRight: 10
  },
  button: {
    borderRadius: 100,
    padding: 10
  },
  buttonText: {
    color: theme.palette.primary.contrastText,
  },
  extendedIcon: {
    color: theme.palette.primary.contrastText,
    marginRight: 5
  },
  whiteColor: {
    color: theme.palette.primary.contrastText
  }
}));


var courseData = [];

var logout = () => {
  AuthService.logout();
}

// this.state = {
//   courses: ['item']
// }
// var addItem = () => {
//   const newItem = 'And Another Course';
//   this.setstate({ items: [...this.state.items, newItem] })
// }

const instructorId = localStorage.getItem('instructorId');
const authToken = localStorage.getItem('auth-token');

export default function Dashboard() {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);

  CourseService.getCourses(instructorId, authToken).then((coursesFromDb) => {
    console.log(coursesFromDb);

    courseData = [];

    coursesFromDb.forEach((c) => {
      courseData.push(c);
    })
    setLoading(true);
  })

  //Routing Functions
  const history = useHistory();

  const navigateTo = (path) => history.push(path);

  //Popper Menu Functions


  //Popper Idhr tk he

 
  

  return (

    <React.Fragment>
      <CssBaseline />

      <AppBar position="relative">
        <Toolbar>
          <Grid container spacing={2} justify='space-between' alignItems='center'>
            <div>
              <Button component={Link} to="/student/dashboard">
                <img src={logoImg} alt="logo" style={{ width: 40, marginRight: 10 }} />
                <Typography className={classes.whiteColor}>
                  Examinator
                </Typography>
              </Button>
            </div>
            <div>

              <Button raised className={classes.button} onClick={logout}>
                <ExitToAppIcon className={classes.extendedIcon} />
                <Typography className={classes.buttonText}>
                  Log Out
                </Typography>
              </Button>
            </div>
          </Grid>
        </Toolbar>
      </AppBar>

      {/* <div>
        <Fab variant="extended" onClick={addCourse} color="primary" aria-label="add" className={classes.margin} >
          <AddCircleIcon className={classes.extendedIcon} />
          Add Course
        </Fab>
      </div> */}
      <main>
        <Container className={classes.cardGrid}>
          <Grid container spacing={2} justify="center">
            {courseData.map((course, c) => (
              <div key={c} className={classes.card}>
                <ButtonBase
                  onClick={event => { navigateTo('../instructor/course?id=1') }}
                >
                  <Card className={classes.card} elevation={7}>
                    <CardHeader
                      avatar={
                        <Avatar className={classes.avatar}>
                          
                        </Avatar>
                      }
                      title={course.courseName}
                      subheader={course.courseCode}
                    />
                    <CardMedia
                      className={classes.cardMedia}
                    />
                  </Card>
                </ButtonBase>
              </div>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Examinator
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Smart Examination System
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment >
  );
}