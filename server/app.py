import os
from flask import Flask, request, jsonify
import pickle
import numpy as np

app = Flask(__name__)

# Get the directory of the current file
current_directory = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(current_directory, 'logistic_regression_model.pkl')

# Load the serialized logistic regression model
with open(model_path, 'rb') as model_file:
    model = pickle.load(model_file)

@app.route('/predict', methods=['POST'])
def predict():
    # Extract user input from the HTTP request
    data = request.get_json()
    user_input = np.array(data['user_input']).reshape(1, -1)

    # Make prediction using the loaded logistic regression model
    prediction = model.predict(user_input)

    # Return prediction as JSON response
    return jsonify({'prediction': prediction.tolist()})

if __name__ == '__main__':
    app.run(debug=True)
