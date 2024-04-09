from flask import current_app, request, jsonify, render_template, g
from .loaders import load_model, load_encoder
import numpy as np
import pandas as pd

from pymongo import MongoClient

def register_routes(app):
    # Load shared resources
    model = load_model()
    # scaler = load_scaler()
    encoder = load_encoder()

    @app.before_request
    def init_db():
        g.mongo = MongoClient(current_app.config["MONGO_URI"])

    @app.route('/', methods=['GET'])
    def home():
        return render_template('index.html')

    @app.route('/api/predict', methods=['POST'])
    def predict():
        try:
            # Extract user input from the HTTP request
            data = request.get_json()
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
    
            # Example of using PyMongo to store the prediction result
            db = g.mongo.get_database('AI_prediction')
            predictions_collection = db.predictions  # Assuming 'predictions' is your collection name
    
            # Example document structure, adjust as necessary
            prediction_document = {
                'user_input': data,
                'prediction_result': prediction.tolist(),
            }
            insert_result = predictions_collection.insert_one(prediction_document)

            # Return the prediction along with additional information as needed
            return jsonify({
                'prediction': prediction.tolist(),
                'inserted_id': str(insert_result.inserted_id)
            })
        except Exception as e:
            # Log the error and return an error message
            current_app.logger.error(f'Error making prediction: {e}')
            return jsonify({'error': 'An error occurred during prediction.'}), 500

