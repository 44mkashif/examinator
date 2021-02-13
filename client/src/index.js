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
      light: '#33ab9f',
      main: '#009688',
      dark: '#00695f',
      contrastText: '#fff',
    },
    secondary: {
      light: '#4aedc4',
      main: '#1de9b6',
      dark: '#14a37f',
      contrastText: '#000',
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