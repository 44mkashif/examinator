import React, { Component } from 'react';
import axios from 'axios'

class CourseService extends Component {

    static async getCourses(instructorId, authToken) {
        try {
            const res = await axios.get(`http://localhost:4000/api/instructor/courses?instructorId=${instructorId}`, {
                headers: {
                    'auth-token': authToken
                },
            });
            if (res.data.success) {
                // console.log(res.data.courses);
                return res.data.courses;
            } else {
                console.log(res.data.msg);
            }
        } catch (error) {
            console.log(error.response)
        }
    }

    static async getCourse(courseId, authToken, isInstructor) {
        var api = "";
        if (isInstructor) {
            api = "instructor";
        } else {
            api = "student";
        }

        try {
            const res = await axios.get(`http://localhost:4000/api/${api}/course?courseId=${courseId}`, {
                headers: {
                    'auth-token': authToken
                },
            });
            if (res.data.success) {
                // console.log(res.data.courses);
                return res.data.course;
            } else {
                console.log(res.data.msg);
            }
        } catch (error) {
            console.log(error.response)
        }
    }

    static async createCourse(body, authToken) {
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

}

export default CourseService;