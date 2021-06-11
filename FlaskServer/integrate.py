from person_and_phone import detect_p_n_p
from head_pose_estimation import head_pose
from mouth_opening_detector import mouth_opening_detection
from lstm import predict_lstm
import PIL
import numpy as np
import traceback

def extract_features(image):
    try:
        im = PIL.Image.open(image)
        image=np.array(im)
        mobile, p_count = detect_p_n_p(image)
        head_dir = head_pose(image)
        mouth = mouth_opening_detection(image)
        return mobile, p_count, head_dir, mouth
    except:
        return False

