from . import db
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Document):
    username = db.StringField(max_length=64, unique=True, required=True)
    password_hash = db.StringField(required=True)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


class PredictionData(db.Document):
    Drug = db.StringField(required=True)
    Age = db.IntField(required=True)
    Sex = db.StringField(max_length=1, required=True)
    Ascites = db.StringField(max_length=1, required=True)
    Hepatomegaly = db.StringField(max_length=1, required=True)
    Spiders = db.StringField(max_length=1, required=True)
    Edema = db.StringField(max_length=1, required=True)
    Bilirubin = db.FloatField(required=True)
    Cholesterol = db.FloatField()
    Albumin = db.FloatField(required=True)
    Copper = db.FloatField(required=True)
    Alk_Phos = db.FloatField(required=True)
    Sgot = db.FloatField(required=True)
    Tryglicerides = db.FloatField()
    Platelets = db.FloatField()
    Prothrombin = db.FloatField(required=True)
    Stage = db.IntField(required=True)