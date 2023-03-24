# Examinator

## About
Examinator is a smart examination system developed to assist in invigilation of online exams using Artificial Intelligence to monitor a student using their webcam feed. The purpose of the system is to show invigilators filtered streams based on the level of suspiciousness.

## Quick Start

``` bash
# Navigate to the server directory
cd server

# Install dependencies for Express server
npm install

# Install dependencies for React client
npm run client-install

# Install dependencies for WebRTC Server
npm run webrtc-install

# Install dependencies for Flask Server
npm run flask-install

# Run the React client, Express, WebRTC and Flask Servers with concurrently
npm run dev

# Run the Express server only
npm run server

# Run the React client only
npm run client

# Run the WebRTC Server only
npm run webrtc

# Run the Flask Server only
npm run flask

# Express Server Port:  4000 
# React client Port:    3000
# WebRTC Server Port:   4001
# Flask Server Port:    5000
```

----

start mongodb with 

docker-compose -f .\mongo-docker-compose.yml up -d

start server with node server.js
when database connected successfully

install mongo compass
install postman

import examinator.postman collection in postman


create instructor using

post request using postman
http://localhost:4000/api/admin/addInstructor

payload

{
    "fname": "Ali",
    "lname": "Shoukat",
    "userName": "ali.shoukat",
    "email": "ali.shoukat@giki.edu.pk",
    "password": "abcd1234"
}

signin using instructor portal

copy auth-token of instructor

use that token in the header 0f following post requests

addstudent

addcourse

Rest of the part can be done using UI