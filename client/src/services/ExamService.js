import React, { Component } from 'react';
import axios from 'axios'

class ExamService extends Component {

    static async getExams(courseId, authToken) {
        try {
            const res = await axios.get(`http://localhost:4000/api/instructor/exam?courseId=${courseId}`, {
                headers: {
                    'auth-token': authToken
                },
            });
            if (res.data.success) {
                console.log(res.data);
                return res.data.exam;
            } else {
                console.log(res.data.msg);
            }
        } catch (error) {
            console.log(error.response)
        }
    }
}

export default ExamService;