import face_recognition


def compare_faces(file1, file2):
    image1 = face_recognition.load_image_file(file1)
    image2 = face_recognition.load_image_file(file2)

    image1_encoding = face_recognition.face_encodings(image1)[0]
    image2_encoding = face_recognition.face_encodings(image2)[0]

    results = face_recognition.compare_faces(
        [image1_encoding], image2_encoding)

    return results[0]
