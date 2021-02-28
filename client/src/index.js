import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import 'fontsource-roboto';


import StudentLogin from './Pages/student/Login';
import StudentDashboard from './Pages/student/Dashboard';
import StudentCourse from './Pages/student/Course';
import StudentExam from './Pages/student/Exam';
import StudentPaper from './Pages/student/Paper';

import InstructorLogin from './Pages/Instructor/Login';
import InstructorDashboard from './Pages/Instructor/Dashboard';
import InstructorCourse from './Pages/Instructor/Course';
import InstructorSchedule from './Pages/Instructor/Schedule';
import InstructorPaper from './Pages/Instructor/Paper';
import InstructorExam from './Pages/Instructor/Exam';

import Test from './Pages/TestPage';



import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { GuardProvider, GuardedRoute } from 'react-router-guards'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#52eff7',
      main: '#4aabb1',
      dark: '#0b979e',
      contrastText: '#fff',
    },
    secondary: {
      light: '#659294',
      main: '#4a7a7d',
      dark: '#386163',
      contrastText: '#fff',
    },
    error: {  
      light: '#f6685e',
      main: '#f44336',
      dark: '#aa2e25',
      contrastText: '#fff',
    },
    type: 'light'
  },
  fontFamily: 'fontsource-roboto' // as an aside, highly recommend importing roboto font for Material UI projects! Looks really nice
});

const authGuard = (to, from, next) => {
  if(localStorage.getItem('auth-token')){
    if(to.meta.auth){
      if(localStorage.getItem('role') == 'student' && to.meta.role == 'student') {
        next();
      } else if(localStorage.getItem('role') == 'instructor' && to.meta.role == 'instructor') {
        next();
      } else {
        if(localStorage.getItem('role') == 'student') {
          next.redirect('/student/dashboard')
        } else if(localStorage.getItem('role') == 'instructor') {
          next.redirect('/instructor/dashboard')
        }
      }
    } else {
      if(localStorage.getItem('role') == 'student') {
        next.redirect('/student/dashboard')
      } else if(localStorage.getItem('role') == 'instructor') {
        next.redirect('/instructor/dashboard')
      }
    }
  } else {
    if(to.meta.auth){
      if(to.meta.role == 'student'){
        next.redirect('/Student/Login')
      } else if (to.meta.role == 'instructor') {
        next.redirect('/Instructor/Login')
      }
    } else {
      next();
    }
  }
}

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <GuardProvider guards={[authGuard]}>
        <Switch>
          <GuardedRoute  path="/" exact component={App} />
          <GuardedRoute  path="/Student/Login" exact component={StudentLogin} />
          <GuardedRoute  path="/Student/Dashboard" exact component={StudentDashboard} meta={{auth: true, role: 'student'}} />
          <GuardedRoute  path="/Student/Course" exact component={StudentCourse} meta={{auth: true, role: 'student'}} />
          <GuardedRoute  path="/Student/Course/Exam" exact component={StudentExam} meta={{auth: true, role: 'student'}} />
          <GuardedRoute  path="/Student/Course/Paper" exact component={StudentPaper} meta={{auth: true, role: 'student'}} />

          
          <GuardedRoute  path="/Instructor/Login" exact component={InstructorLogin} />
          <GuardedRoute  path="/Instructor/Dashboard" exact component={InstructorDashboard} meta={{auth: true, role: 'instructor'}} />
          <GuardedRoute  path="/Instructor/Course" exact component={InstructorCourse} meta={{auth: true, role: 'instructor'}} />
          <GuardedRoute  path="/Instructor/Course/Schedule" exact component={InstructorSchedule} meta={{auth: true, role: 'instructor'}} />
          <GuardedRoute path="/Instructor/Course/Paper" exact component={InstructorPaper} meta={{auth: true, role: 'instructor'}} />
          <GuardedRoute path="/Instructor/Course/Exam" exact component={InstructorExam} meta={{auth: true, role: 'instructor'}} />
          
        </Switch>
      </GuardProvider>
    </BrowserRouter>
  </ThemeProvider>,
  document.getElementById('root')
);