import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import ButtonBase from '@material-ui/core/ButtonBase'; 
import { useHistory } from 'react-router-dom';
import AppBar from './Components/AppBar';

import Fab from '@material-ui/core/Fab';
import AddCircleIcon from '@material-ui/icons/AddCircle';


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
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));





var courses = ['Devops', 'Data Structures', 'Data Science', 'Robotic Vision', 'Web Engineering', 'Block Chain'];


var addCourse = () => {
  courses.push("Kiwi");
  console.log('course pushed'+courses)
}

// this.state = {
//   courses: ['item']
// }
// var addItem = () => {
//   const newItem = 'And Another Course';
//   this.setstate({ items: [...this.state.items, newItem] })
// }
export default function Dashboard() {
  const classes = useStyles();

  //Routing Functions
  const history = useHistory();

  const navigateTo = (path) => history.push(path);

  //Popper Menu Functions


   //Popper Idhr tk he

  return (
    
    <React.Fragment>
      <CssBaseline />
      
      <AppBar />

      <div>
        <Fab variant="extended" onClick={addCourse} color="primary" aria-label="add" className={classes.margin} >
          <AddCircleIcon className={classes.extendedIcon} />
          Add Course
        </Fab>
      </div>
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {courses.map((course) => (

              <Grid item key={course} xs={12} sm={6} md={4}>
                  <ButtonBase
                      onClick={event => {navigateTo('../teacher/course?id=1')}}
                  >
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {course}
                    </Typography>
                    <Typography>
                      This will be course description
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
    </React.Fragment>
  );
}