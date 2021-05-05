import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import 'fontsource-roboto';

import StudentLogin from './Pages/Student/Login';
import StudentDashboard from './Pages/Student/Dashboard';
import StudentCourse from './Pages/Student/Course';
import StudentExam from './Pages/Student/Exam';
import StudentExamInstruction from './Pages/Student/ExamInstruction';
import StudentExamComplete from './Pages/Student/ExamComplete';
import FaceDetect from './Pages/Student/FaceDetect';
import ExamWait from './Pages/Student/ExamWait';
import ExamPrevious from './Pages/Student/ExamPrevious';

import InstructorLogin from './Pages/Instructor/Login';
import InstructorDashboard from './Pages/Instructor/Dashboard';
import InstructorCourse from './Pages/Instructor/Course';
import InstructorPaper from './Pages/Instructor/Paper';
import InstructorExam from './Pages/Instructor/Exam';



import Test from './Pages/TestPage';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { GuardProvider, GuardedRoute } from 'react-router-guards'

import theme from './theme';

const authGuard = (to, from, next) => {
  if (localStorage.getItem('auth-token')) {
    if (to.meta.auth) {
      if (localStorage.getItem('role') === 'student' && to.meta.role === 'student') {
        next();
      } else if (localStorage.getItem('role') === 'instructor' && to.meta.role === 'instructor') {
        next();
      } else {
        if (localStorage.getItem('role') === 'student') {
          next.redirect('/student/dashboard')
        } else if (localStorage.getItem('role') === 'instructor') {
          next.redirect('/instructor/dashboard')
        }
      }
    } else {
      if (localStorage.getItem('role') === 'student') {
        next.redirect('/student/dashboard')
      } else if (localStorage.getItem('role') === 'instructor') {
        next.redirect('/instructor/dashboard')
      }
    }
  } else {
    if (to.meta.auth) {
      if (to.meta.role === 'student') {
        next.redirect('/Student/Login')
      } else if (to.meta.role === 'instructor') {
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
          <GuardedRoute path="/" exact component={App} />
          <GuardedRoute path="/Student/Login" exact component={StudentLogin} />
          <GuardedRoute path="/Student/Dashboard" exact component={StudentDashboard} meta={{ auth: true, role: 'student' }} />
          <GuardedRoute path="/Student/Course/:course" exact component={StudentCourse} meta={{ auth: true, role: 'student' }} />
          <GuardedRoute path="/Student/Course/Exam/:exam" exact component={StudentExam} meta={{ auth: true, role: 'student' }} />
          <GuardedRoute path="/Student/Course/ExamInstruction/:exam" exact component={StudentExamInstruction} meta={{ auth: true, role: 'student' }} />
          <GuardedRoute path="/Student/Course/ExamComplete/:exam" exact component={StudentExamComplete} meta={{ auth: true, role: 'student' }} />
          <GuardedRoute path="/Student/Course/ExamPrevious/:exam" exact component={ExamPrevious} meta={{ auth: true, role: 'student' }} />
          <GuardedRoute path="/Student/FaceDetect/:exam" exact component={FaceDetect} meta={{ auth: true, role: 'student' }} />
          <GuardedRoute path="/Student/ExamWait/:exam" exact component={ExamWait} meta={{ auth: true, role: 'student' }} />

          <Route path="/test" exact component={Test} />


          <GuardedRoute path="/Instructor/Login" exact component={InstructorLogin} />
          <GuardedRoute path="/Instructor/Dashboard" exact component={InstructorDashboard} meta={{ auth: true, role: 'instructor' }} />
          <GuardedRoute path="/Instructor/Course/:course" exact component={InstructorCourse} meta={{ auth: true, role: 'instructor' }} />
          <GuardedRoute path="/Instructor/Course/:course/Paper" exact component={InstructorPaper} meta={{ auth: true, role: 'instructor' }} />
          <GuardedRoute path="/Instructor/Course/Exam/:exam" exact component={InstructorExam} meta={{ auth: true, role: 'instructor' }} />

        </Switch>
      </GuardProvider>
    </BrowserRouter>
  </ThemeProvider>,
  document.getElementById('root')
);