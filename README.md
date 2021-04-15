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

# Run the React client, Express server, WebRTC and Flask Servers with concurrently
npm run dev

# Run the Express server only
npm run server

# Run the React client only
npm run client

# Run the WebRTC Server only
npm run webrtc

# Run the Flask Server only
npm run flask

# Express Server: http://localhost:4000 
# React client:   http://localhost:3000
# WebRTC Server:  http://localhost:4001
# Flask Server:   http://localhost:5000
```
