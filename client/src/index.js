import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";


import StudentLogin from './Pages/student/Login';
import StudentDashboard from './Pages/student/Dashboard';
import StudentCourse from './Pages/student/Course';

import TeacherLogin from './Pages/Teacher/Login';
import TeacherDashboard from './Pages/Teacher/Dashboard';
import TeacherCourse from './Pages/Teacher/Course';



import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

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

        
        <Route path="/Teacher/Login" exact component={TeacherLogin} />
        <Route path="/Teacher/Dashboard" exact component={TeacherDashboard} />
        <Route path="/Teacher/Course" exact component={TeacherCourse} />
        
      </Switch>
    </BrowserRouter>
  </ThemeProvider>,
  document.getElementById('root')
);