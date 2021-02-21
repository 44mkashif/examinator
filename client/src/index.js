import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import 'fontsource-roboto';


import StudentLogin from './Pages/student/Login';
import StudentDashboard from './Pages/student/Dashboard';
import StudentCourse from './Pages/student/Course';

import InstructorLogin from './Pages/Instructor/Login';
import InstructorDashboard from './Pages/Instructor/Dashboard';
import InstructorCourse from './Pages/Instructor/Course';
import InstructorSchedule from './Pages/Instructor/Schedule';
import InstructorPaper from './Pages/Instructor/Paper';
import InstructorExam from './Pages/Instructor/Exam'



import { BrowserRouter, Route, Switch } from 'react-router-dom';

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


ReactDOM.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/Student/Login" exact component={StudentLogin} />
        <Route path="/Student/Dashboard" exact component={StudentDashboard} />
        <Route path="/Student/Course" exact component={StudentCourse} />

        
        <Route path="/Instructor/Login" exact component={InstructorLogin} />
        <Route path="/Instructor/Dashboard" exact component={InstructorDashboard} />
        <Route path="/Instructor/Course" exact component={InstructorCourse} />
        <Route path="/Instructor/Course/Schedule" exact component={InstructorSchedule} />
        <Route path="/Instructor/Course/Paper" exact component={InstructorPaper} />
        <Route path="/Instructor/Course/Exam" exact component={InstructorExam} />
        
      </Switch>
    </BrowserRouter>
  </ThemeProvider>,
  document.getElementById('root')
);