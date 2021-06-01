import tensorflow as tf
import numpy as np

model = tf.keras.models.load_model('models/lstm_model.h5')


def predict_lstm(inp):
    inp = np.asarray(inp).astype(np.int)
    # inp = inp.to_numpy()
    inp = inp.reshape(1, 240, 4)
    result = model.predict(inp, use_multiprocessing=True)
    return result
