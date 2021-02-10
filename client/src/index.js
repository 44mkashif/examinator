import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import SignInStudent from './Login Student/login_student';
import SignInTeacher from './Login Teacher/login_Teacher';
import Course from './Courses/courses';
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
        <Route path="/student" exact component={SignInStudent} />
        <Route path="/teacher" exact component={SignInTeacher} />
        <Route path="/courses" exact component={Course} />
      </Switch>
    </BrowserRouter>
  </ThemeProvider>,
  document.getElementById('root')
);