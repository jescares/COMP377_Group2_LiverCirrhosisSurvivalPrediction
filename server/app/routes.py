from flask import request, jsonify, render_template
from app import app
from .loaders import load_model, load_encoder, load_scaler
import numpy as np
import pandas as pd

# Load shared resources
model = load_model()
scaler = load_scaler()
encoder = load_encoder()

@app.route('/', methods=['GET'])
def home():
    return render_template('index.html')





@app.route('/predict', methods=['POST'])
def predict():
    # Extract user input from the HTTP request
    data = request.get_json()
    # user_input = np.array(data['user_input']).reshape(1, -1)
    user_input = pd.DataFrame([data]) 

    # Separate categorical and numerical data for preprocessing
    categorical_data = user_input[['Drug', 'Sex', 'Ascites', 'Hepatomegaly', 'Spiders', 'Edema']]
    numerical_data = user_input.drop(columns=['Drug', 'Sex', 'Ascites', 'Hepatomegaly', 'Spiders', 'Edema'])

    # Transform categorical data with OneHotEncoder
    categorical_data_encoded = encoder.transform(categorical_data).toarray()
    # Scale numerical data with StandardScaler
    numerical_data_scaled = scaler.transform(numerical_data)

    # Combine encoded categorical data and scaled numerical data
    user_input_final = np.hstack((numerical_data_scaled, categorical_data_encoded))

    # Make prediction using the loaded logistic regression model
    # prediction = model.predict(user_input)
    prediction = model.predict(user_input_final)

    # Return prediction as JSON response
    return jsonify({'prediction': prediction.tolist()})


