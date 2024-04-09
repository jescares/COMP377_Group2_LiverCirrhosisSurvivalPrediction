import pickle
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def load_model():
    model_path = os.path.join(BASE_DIR, 'logistic_regression_model.pkl')
    with open(model_path, 'rb') as model_file:
        model = pickle.load(model_file)
    return model

def load_encoder():
    encoder_path = os.path.join(BASE_DIR, 'encoder.pkl')
    with open(encoder_path, 'rb') as encoder_file:
        encoder = pickle.load(encoder_file)
    return encoder
