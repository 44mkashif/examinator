import React, { Component } from 'react';
import axios from 'axios'

class ResultService extends Component {

    static async getAnswers(examId, studentId, authToken) {
        try {
            const res = await axios.get(`http://localhost:4000/api/student//get-answers?examId=${examId}&studentId=${studentId}`, {
                headers: {
                    'auth-token': authToken
                },
            });
            if (res.data.success) {
                console.log(res.data);
                return res.data.answers;
            } else {
                console.log(res.data.msg);
            }
        } catch (error) {
            console.log(error.response)
        }
    }

    static async addResult(body, authToken) {
        try {
            const res = await axios.post('http://localhost:4000/api/student/add-result', body, {
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

    static async getResult(examId, studentId, authToken) {
        try {
            const res = await axios.get(`http://localhost:4000/api/student/result/?examId=${examId}&studentId=${studentId}`, {
                headers: {
                    'auth-token': authToken
                },
            });
            if (res.data.success) {
                console.log(res.data);
                return res.data.result;
            } else {
                console.log(res.data.msg);
            }
        } catch (error) {
            console.log(error.response)
        }
    }

    static async getResults(examId, authToken) {
        try {
            const res = await axios.get(`http://localhost:4000/api/instructor/results/?examId=${examId}`, {
                headers: {
                    'auth-token': authToken
                },
            });
            if (res.data.success) {
                console.log(res.data);
                return res.data.result;
            } else {
                console.log(res.data.msg);
            }
        } catch (error) {
            console.log(error.response)
        }
    }

}

export default ResultService;