import pandas as pd
from lstm import predict_lstm

def append_features_get_class(features, id):
    df = pd.read_csv('checkpoints/'+id+'.csv', header = None)
    df = df.append({1: features[0], 2: features[1], 3: features[2], 4: features[3], 5: features[4]}, ignore_index=True) 
    if len(df) == 240:
        df = df[0:0]
        ret = predict_lstm(df)
    else:
        ret = -1
    df.to_csv('checkpoints/'+id + '.csv', header=False, index=False)
    return ret