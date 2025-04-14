from app.extensions import db
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
    __tablename__ = 'users'

    user_id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    dob = db.Column(db.String(50), nullable=False)
    contact_number = db.Column(db.String(15), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    type_of_user = db.Column(db.String(20), nullable=False)

    def __init__(self, first_name, last_name, dob, contact_number, email, password, type_of_user):
        self.first_name = first_name
        self.last_name = last_name
        self.dob = dob
        self.contact_number = contact_number
        self.email = email
        self.password_hash = generate_password_hash(password)
        self.type_of_user = type_of_user

    def to_dict(self):
        return {
            "user_id": self.user_id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "dob": self.dob,
            "contact_number": self.contact_number,
            "email": self.email,
            "type_of_user": self.type_of_user
        }

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)