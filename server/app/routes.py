from flask import request, jsonify, render_template
from app import app
from .loaders import load_model, load_encoder
import numpy as np
import pandas as pd

# Load shared resources
model = load_model()
# scaler = load_scaler()
encoder = load_encoder()

@app.route('/', methods=['GET'])
def home():
    return render_template('index.html')

@app.route('/api/predict', methods=['POST'])
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

    # Combine encoded categorical data and scaled numerical data
    processed_data = np.hstack((numerical_data, categorical_data_encoded))
    processed_df = pd.DataFrame(processed_data, columns=encoder.get_feature_names_out().tolist() + numerical_data.columns.tolist())
    
    # Select only the features to be used for prediction
    selected_features = [
        'Bilirubin', 'Copper', 'Prothrombin', 'Stage', 'Edema_N',
        'Hepatomegaly_N', 'Hepatomegaly_Y', 'Ascites_Y', 'Ascites_N',
        'Alk_Phos'
    ]
    
    # Ensure all selected features are present, fill missing with appropriate values if necessary
    for feature in selected_features:
        if feature not in processed_df.columns:
            processed_df[feature] = 0  # Assuming missing categorical features can be filled with 0
    
    # Reorder the DataFrame to match the model's expected input
    user_input_final = processed_df[selected_features]

    # Make prediction using the loaded logistic regression model
    # prediction = model.predict(user_input)
    prediction = model.predict(user_input_final)

    # Return prediction as JSON response
    return jsonify({'prediction': prediction.tolist()})


