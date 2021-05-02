import React, { Component } from 'react';
import axios from 'axios';

class FacialRecognitionService extends Component {

    static async verifyImage(body) {
        try {
            console.log(body);
            const res = await axios.post('http://localhost:5000/api/face_match', body);
            if (res.data.success) {
                console.log(res);
                return res.data.success;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    static async getImage(userId, authToken) {
        try {
            const res = await axios.get(`http://localhost:4000/api/student/get-image?userId=${userId}`, {
                headers: {
                    'auth-token': authToken
                },
            });
            if (res.data.success) {
                // console.log(res.data);
                return res.data.imgURL;
            } else {
                console.log(res.data.msg);
            }
        } catch (error) {
            console.log(error.response)
        }
    }
}

export default FacialRecognitionService;