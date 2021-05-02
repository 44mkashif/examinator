import React, { Component } from 'react';
import axios from 'axios'

class ExamService extends Component {

    static async getExams(courseId, authToken) {
        try {
            const res = await axios.get(`http://localhost:4000/api/instructor/exams?courseId=${courseId}`, {
                headers: {
                    'auth-token': authToken
                },
            });
            if (res.data.success) {
                console.log(res.data);
                return res.data.exams;
            } else {
                console.log(res.data.msg);
            }
        } catch (error) {
            console.log(error.response)
        }
    }

    static async getExam(examId, authToken) {
        try {
            const res = await axios.get(`http://localhost:4000/api/student/exam/?examId=${examId}`, {
                headers: {
                    'auth-token': authToken
                },
            });
            if (res.data.success) {
                // console.log(res.data);
                return res.data.exam;
            } else {
                console.log(res.data.msg);
            }
        } catch (error) {
            console.log(error.response)
        }
    }

    static async createExam(body, authToken) {
        try {
            const res = await axios.post('http://localhost:4000/api/instructor/exam', body, {
                headers: {
                    'auth-token': authToken
                },
            });
            if (res.data.success) {
                console.log(res.data);
                return res.data;
            }
        } catch (error) {
            console.log(error.response.data);
            return error.response.data;

        }
    }

    static async submitAnswer(body, authToken) {
        try {
            const res = await axios.post('http://localhost:4000/api/student/submit-answer', body, {
                headers: {
                    'auth-token': authToken
                },
            });
            if (res.data.success) {
                console.log(res.data);
                return res.data;
            }
        } catch (error) {
            console.log(error.response.data);
            return error.response.data;
        }
    }


}

export default ExamService;