'use strict'

const jwt = require('jsonwebtoken');

class AuthMiddleware {

    static generateToken(_id) {
        return jwt.sign({ _id }, '3xaw!uAf0r$3cr3t', {expiresIn: '365d' });
    }

    static decodeToken(token) {
        return jwt.decode(token);
    }
}

module.exports = { AuthMiddleware }