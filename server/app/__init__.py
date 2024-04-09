from flask import Flask
from pymongo import MongoClient

def create_app():
    app = Flask(__name__)
    app.config["MONGO_URI"] = "mongodb://localhost:27017/AI_prediction"
    app.config['SECRET_KEY'] = 'your_secret_key'  
    
    # Initialize PyMongo client
    app.mongo = MongoClient(app.config["MONGO_URI"])

    with app.app_context():
        from . import routes  # Import routes
        
    return app
