import pandas as pd
from lstm import predict_lstm
import os


columns = [0, 1, 2, 3]


def getDataFrame(id):
    if os.path.exists('checkpoints/'+id+'.csv'):
        df = pd.read_csv('checkpoints/'+id+'.csv', header=None)
    else:
        df = pd.DataFrame(columns=columns)
    return df


def append_features_get_class(features, id):
    df = getDataFrame(id)
    df2 = pd.DataFrame(columns=columns)
    df2 = df2.append({0: int(features[0]), 1: features[1],
                      2: features[2], 3: features[3]}, ignore_index=True)
    df = df.append(df2)
    if len(df) == 240:
        print(df)
        os.remove('checkpoints/'+id + '.csv')
        ret = predict_lstm(df)
    else:
        ret = -1
        df2.to_csv('checkpoints/'+id + '.csv',
                   header=False, index=False, mode='a')
    return ret
