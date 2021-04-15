from flask import Flask, request, jsonify
from face_rec import compare_faces
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)

@app.route('/face_match', methods=['POST'])
@cross_origin()
def face_match():
    if request.method == 'POST':
        # check if the post request has the file part
        if ('file1' in request.files) and ('file2' in request.files):
            file1 = request.files.get('file1')
            file2 = request.files.get('file2')
            ret = compare_faces(file1, file2)
            # convert numpy._bool to bool for json.dumps
            response = jsonify(success=bool(ret))

            return response

if __name__ == "__main__":
    app.run(debug=True, port=5000)
