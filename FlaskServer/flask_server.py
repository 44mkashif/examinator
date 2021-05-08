from flask import Flask, request, jsonify
from face_rec import compare_faces
from flask_cors import CORS, cross_origin
from integrate import extract_features
import base64
from PIL import Image
import cv2
from io import StringIO
import numpy as np

app = Flask(__name__)
CORS(app)


@app.route('/api/face_match', methods=['POST'])
@cross_origin()
def face_match():
    if request.method == 'POST':
        # check if the post request has the file part
        print(request.files)
        if ('file1' in request.files) and ('file2' in request.files):
            file1 = request.files.get('file1')
            file2 = request.files.get('file2')

            ret = compare_faces(file1, file2)
            response = jsonify(success=bool(ret))

            return response

@app.route('/api/classify', methods=['POST'])
@cross_origin()
def classify():
    if request.method == 'POST':
        # check if the post request has the file part
        print("test")
        if ('frame' in request.files):
            frame = request.files.get('frame')
            ret = extract_features(frame)
            if bool(ret) == False:
                response = jsonify(success=False)
            else:
                response = jsonify(success=True, features=ret)

            return response


if __name__ == "__main__":
    app.run(debug=True, port=5000)
