import React, { useEffect } from 'react';
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
import logoImg from './../../assets/logo-dark.png';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AuthService from '../../services/AuthService';
import CourseService from '../../services/CourseService';
import Footer from '../Components/Footer';
import theme from './../../theme';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

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
    // margin: theme.spacing(1, 3, 2),
    border: `1px solid ${theme.palette.primary.dark}`,
    borderRadius: "10px"
    // display: 'flex',
    // flexDirection: 'column',
  },
  cardDiv: {
    padding: "10px",
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
    backgroundImage: `url(${courseImage})`,
  },
  cardContent: {
    flexGrow: 1,
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
  },
  avatar: {
    backgroundColor: theme.palette.primary.main
  },
  loader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '350px'
  }
}));

var courseData = [];

var logout = () => {
  AuthService.logout();
}

const instructorId = '603c093af7679f2738b69f29';
const authToken = localStorage.getItem('auth-token');

// this.state = {
//   courses: ['item']
// }
// var addItem = () => {
//   const newItem = 'And Another Course';
//   this.setstate({ items: [...this.state.items, newItem] })
// }
export default function Dashboard() {
  const classes = useStyles();

  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    CourseService.getCourses(instructorId, authToken).then((coursesFromDb) => {
      console.log(coursesFromDb);

      courseData = [];

      coursesFromDb.forEach((c) => {
        courseData.push(c);
      })
      setLoading(true);
    });
  }, []);



  //Routing Functions
  const history = useHistory();

  const navigateTo = (path) => history.push(path);

  return (

    <React.Fragment>
      <CssBaseline />
      {!loading ?
        <Loader type="BallTriangle" className={classes.loader} color={theme.palette.primary.main} height={80} width={80} />
        :
        <div>
          <AppBar position="relative">
            <Toolbar>
              <Grid container spacing={2} justify='space-between' alignItems='center'>
                <div>
                  <Grid container spacing={2} justify='space-between' alignItems='center'>
                    <div>
                      <Button >
                        <img src={logoImg} alt="logo" style={{ width: 40, marginRight: 10 }} />
                        <Typography className={classes.whiteColor}>
                          EXAMINATOR
                          </Typography>
                      </Button>
                    </div>
                  </Grid>
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
          <main>
            <Container className={classes.cardGrid}>

              <Grid container spacing={2} justify="center">
                {courseData.map((course, c) => (
                  <div key={c} className={classes.cardDiv}>
                    <ButtonBase
                      onClick={event => { navigateTo(`../Student/Course/${course._id}`) }}
                    >
                      <Card className={classes.card} elevation={10}>
                        <CardHeader
                          avatar={
                            <Avatar className={classes.avatar}>
                              {course.courseCode[0] + course.courseCode[1]}
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
          <Footer />
        </div>
      }
    </React.Fragment>
  );
}