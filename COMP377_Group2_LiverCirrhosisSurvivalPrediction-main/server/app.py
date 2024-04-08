from flask import Flask, request, jsonify
import pickle
import numpy as np

app = Flask(__name__)

# Load the serialized logistic regression model
with open('logistic_regression_model.pkl', 'rb') as model_file:
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
