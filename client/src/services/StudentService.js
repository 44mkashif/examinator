import React, { Component } from 'react';
import axios from 'axios'

class StudentService extends Component {

    static async getStudent(studentId, authToken) {
        try {
            const res = await axios.get(`http://localhost:4000/api/instructor/student-details?studentId=${studentId}`, {
                headers: {
                    'auth-token': authToken
                },
            });
            if (res.data.success) {
                // console.log(res.data.courses);
                return res.data.student;
            } else {
                console.log(res.data.msg);
            }
        } catch (error) {
            console.log(error.response)
        }
    }
}

export default StudentService;