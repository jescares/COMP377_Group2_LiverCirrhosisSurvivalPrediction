import os
from flask import Flask, request, jsonify
import pickle
import numpy as np
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=['http://127.0.0.1:5173', 'http://localhost:5173'])

# Get the directory of the current file
current_directory = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(current_directory, 'logistic_regression_model.pkl')

# Load the serialized logistic regression model
with open(model_path, 'rb') as model_file:
    model = pickle.load(model_file)

@app.route('/predict', methods=['POST'])
def predict():
    # Extract user input from the HTTP request
    data = request.json

    # Handle logic for Ascites, Hepatomegaly, and Edema
    if data['ascites'] == 'Y':
        data['ascites_n'] = 0
        data['ascites_y'] = 1
    else:
        data['ascites_n'] = 1
        data['ascites_y'] = 0

    if data['hepatomegaly'] == 'Y':
        data['hepatomegaly_n'] = 0
        data['hepatomegaly_y'] = 1
    else:
        data['hepatomegaly_n'] = 1
        data['hepatomegaly_y'] = 0

    if data['edema'] == 'Y':
        data['edema_n'] = 0
        data['edema_y'] = 1
    else:
        data['edema_n'] = 1
        data['edema_y'] = 0

    # Prepare user input data for prediction
    user_input = {
        'Bilirubin': [data['bilirubin']],
        'Copper': [data['copper']],
        'Prothrombin': [data['prothrombin']],
        'Stage': [data['stage']],
        'Edema_N': [data['edema_n']],
        'Hepatomegaly_N': [data['hepatomegaly_n']],
        'Hepatomegaly_Y': [data['hepatomegaly_y']],
        'Ascites_Y': [data['ascites_y']],
        'Ascites_N': [data['ascites_n']],
        'Alk_Phos': [data['alk_phos']]
    }

    # Convert user input data into a DataFrame
    new_user_input = pd.DataFrame(user_input)

    # Preprocess the user input data for prediction
    user_input_values = new_user_input.values

    # Make prediction using the loaded logistic regression model
    prediction = model.predict(user_input_values)

    # Return prediction as JSON response
    return jsonify({'prediction': prediction.tolist()})

if __name__ == '__main__':
    app.run(debug=True)
