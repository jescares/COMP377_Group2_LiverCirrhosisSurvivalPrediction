from flask import Flask
from flask_mongoengine import MongoEngine

db = MongoEngine()

def create_app():
    app = Flask(__name__)
    app.config["MONGO_URI"] = "mongodb://localhost:27017/AI_prediction"
    app.config['SECRET_KEY'] = 'your_secret_key'  
    db.init_app(app)

    with app.app_context():
        from . import routes  # Import routes
        from . import models  # Ensure models are recognized

    return app
