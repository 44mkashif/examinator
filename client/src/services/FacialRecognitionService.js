import React, { Component } from 'react';
import axios from 'axios';


class FacialRecognitionService extends Component {

    static async verifyImage(body) {
        try {

            const res = await axios.post('http://localhost:5000/face_match', body);
            if (res.data.success) {
                console.log(res);
                return res.data.success;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

export default FacialRecognitionService;