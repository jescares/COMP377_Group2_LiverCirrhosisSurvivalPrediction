import os
from flask import Flask, request, jsonify
import pickle
import numpy as np
import pandas as pd

app = Flask(__name__)

# Get the directory of the current file
current_directory = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(current_directory, 'logistic_regression_model.pkl')

# Load the serialized logistic regression model
with open(model_path, 'rb') as model_file:
    model = pickle.load(model_file)

# Sample data for prediction
sample_data = {
    'Bilirubin': [1.0],         # Adjust bilirubin level (higher)
    'Copper': [100.0],          # Adjust copper level (higher)
    'Prothrombin': [11.0],      # Adjust prothrombin time (normal)
    'Stage': [1],               # Adjust stage of disease (early)
    'Edema_N': [1],             # No edema
    'Hepatomegaly_N': [1],      # No hepatomegaly
    'Hepatomegaly_Y': [0],      # No hepatomegaly
    'Ascites_Y': [0],           # No ascites
    'Ascites_N': [1],           # No ascites
    'Alk_Phos': [80.0]          # Adjust alkaline phosphatase level (normal)
}

@app.route('/predict', methods=['POST'])
def predict():
    # Extract user input from the HTTP request (not used in this case)
    # data = request.get_json()

    # Prepare sample data for prediction
    new_sample_data = pd.DataFrame(sample_data)

    # Preprocess the sample data for prediction (reshape if necessary)
    user_input = new_sample_data.values

    # Make prediction using the loaded logistic regression model
    prediction = model.predict(user_input)

    # Return prediction as JSON response
    return jsonify({'prediction': prediction.tolist()})

if __name__ == '__main__':
    app.run(debug=True)
