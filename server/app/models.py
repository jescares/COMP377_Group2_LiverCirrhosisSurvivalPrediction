from . import db, bcrypt

class User(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(64), index=True, unique=True)
    password_hash = db.Column(db.String(128))

    def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
    
    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)


class PredictionData(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    n_days = db.Column(db.Integer)  # Assuming N_Days represents an integer number of days
    status = db.Column(db.String(2))  # 'D', 'C', etc., are short strings
    drug = db.Column(db.String(20))  # 'D-penicillamine' or 'Placebo'
    age = db.Column(db.Integer)  # Assuming age is stored as an integer of days
    sex = db.Column(db.String(1))  # 'M' or 'F'
    ascites = db.Column(db.String(1))  # 'Y' or 'N'
    hepatomegaly = db.Column(db.String(1))  # 'Y' or 'N'
    spiders = db.Column(db.String(1))  # 'Y' or 'N'
    edema = db.Column(db.String(1))  # 'Y', 'N', or 'S'
    bilirubin = db.Column(db.Float)  # Float for numerical data
    cholesterol = db.Column(db.Float, nullable=True)  # Nullable if there might be missing values
    albumin = db.Column(db.Float)
    copper = db.Column(db.Float)
    alk_phos = db.Column(db.Float)
    sgot = db.Column(db.Float)
    tryglicerides = db.Column(db.Float, nullable=True)  # Nullable for potential missing data
    platelets = db.Column(db.Float, nullable=True)  # Nullable for potential missing data
    prothrombin = db.Column(db.Float)
    stage = db.Column(db.Integer)  # Assuming stage is an integer stage