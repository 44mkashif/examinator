import React, { Component } from 'react';
import axios from 'axios';

class ClassificationService extends Component {

    static async classifyImage(body) {
        try {
            // console.log(body);
            const res = await axios.post('http://localhost:5000/api/classify', body);
            // console.log(res);
            if (res.data.success) {
                return res.data;
            }
            else {
                console.log(res.data.success);
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    }

}

export default ClassificationService;