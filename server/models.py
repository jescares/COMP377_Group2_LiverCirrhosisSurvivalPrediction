from flask_mongoengine import MongoEngine
from werkzeug.security import generate_password_hash, check_password_hash

db = MongoEngine()

class User(db.Document):
    name = db.StringField(required=True)
    email = db.EmailField(required=True, unique=True)
    password_hash = db.StringField(required=True)
    role = db.StringField(default='patient')  # Default role is patient

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def is_nurse(self):
        return self.role == 'nurse'

    def is_patient(self):
        return self.role == 'patient'
