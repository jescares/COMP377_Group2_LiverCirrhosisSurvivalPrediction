from flask import Flask, send_from_directory
import os
from flask_cors import CORS

def create_app():
    app = Flask(__name__, static_folder='../client/build', static_url_path='/')
    CORS(app)
    app.config["MONGO_URI"] = "mongodb://localhost:27017/AI_prediction"
    app.config['SECRET_KEY'] = 'your_secret_key'

    # Adjust the Flask route for serving the React app
    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def serve(path):
        if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
            return send_from_directory(app.static_folder, path)
        else:
            return send_from_directory(app.static_folder, 'index.html')

    return app
