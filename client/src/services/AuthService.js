import React, { Component } from 'react';
import axios from 'axios';


class AuthService extends Component {

  static async studentLogin(body) {
    try {

      const res = await axios.post('http://localhost:4000/api/login-student', body);
      if (res.data.success) {
        localStorage.setItem('studentId', res.data.student._id);
        localStorage.setItem('studentName', res.data.student.fName + ' ' + res.data.student.lName);
        localStorage.setItem('auth-token', res.data.token);
        localStorage.setItem('studentRegNo', res.data.student.regNo);
        localStorage.setItem('role', 'student');
        window.location.href = '/Student/Dashboard';
      }
    } catch (error) {
      console.log(error.response.data.msg);
      return error.response.data.msg;
    }
  }

  static async instructorLogin(body) {

    try {
      const res = await axios.post('http://localhost:4000/api/login-instructor', body);
      if (res.data.success) {
        localStorage.setItem('instructorId', res.data.instructor._id);
        localStorage.setItem('instructorName', res.data.instructor.fName + ' ' + res.data.instructor.lName);
        localStorage.setItem('auth-token', res.data.token);
        localStorage.setItem('role', 'instructor');
        window.location.href = '/Instructor/Dashboard';
      }
    } catch (error) {
      console.log(error.response.data.msg);
      return error.response.data.msg;
    }
  }

  static async logout() {
    try {
      localStorage.clear();
      window.location.href = '/';
    } catch (error) {
      console.log(error)
    }
  }

}

export default AuthService;