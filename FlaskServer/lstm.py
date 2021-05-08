import tensorflow as tf

model = tf.keras.models.load_model('models/lstm_model.h5')

def predict_lstm(inp):
    result = model.predict(inp, use_multiprocessing=True)
    return result