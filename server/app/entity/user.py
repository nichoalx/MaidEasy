# Libraries
from flask import current_app
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

# Local dependencies
from ..extensions import db

class User(db.Model):
    __tablename__ = 'users'
    
    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    profile_picture = db.Column(db.String(255), nullable=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    dob = db.Column(db.Date, nullable=False)
    contact_number = db.Column(db.String(15), nullable=False)

    profile_id = db.Column(db.Integer, db.ForeignKey('profiles.profile_id'), nullable=False)
    profile = db.relationship('Profile', backref='users')  # optional reverse access

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password) -> bool:
        return check_password_hash(self.password, password)

    def to_dict(self) -> dict:
        return {
            'user_id': self.user_id,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'dob': self.dob.isoformat() if self.dob else None,
            'profile_id': self.profile_id,
            'profile_name': self.profile.name if self.profile else None
        }

    # ------- CRUD OPERATIONS ---------

    @classmethod
    def create_user(cls, first_name: str, last_name: str, email: str, password: str,
                    dob: str, contact_number: str, type_of_user: str) -> tuple[dict, int]:

        if cls.query.filter_by(email=email).one_or_none():
            return {"error": "Email already exists"}, 409 
        
        try:
            dob_date = datetime.strptime(dob, '%Y-%m-%d').date()
        except ValueError:
            return {"error": "Invalid date format. Use YYYY-MM-DD."}, 400

        new_user = cls(
            first_name=first_name,
            last_name=last_name,
            email=email,
            password=generate_password_hash(password),
            dob=dob_date,
            contact_number=contact_number
        )
        
        with current_app.app_context():
            db.session.add(new_user)
            db.session.commit()

        return new_user.to_dict(), 201

    @classmethod
    def update_user(cls, user_id: int, update_data: dict) -> tuple[dict, int]:
        user = cls.query.get(user_id)
        if not user:
            return {"error": "User not found"}, 404

        try:
            # Update only if field exists and is not empty 
            if update_data.get('first_name'):
                user.first_name = update_data['first_name']
            if update_data.get('last_name'):
                user.last_name = update_data['last_name']
            if update_data.get('email'):
                user.email = update_data['email']
            if update_data.get('password'):
                user.set_password(update_data['password'])
            if update_data.get('dob'):
                try:
                    user.dob = datetime.strptime(update_data['dob'], '%Y-%m-%d').date()
                except ValueError:
                    return {"error": "Invalid date format. Use YYYY-MM-DD."}, 400
            if update_data.get('contact_number'):
                if not update_data['contact_number'].isdigit() or len(update_data['contact_number']) < 8:
                    return {"error": "Invalid contact number"}, 400
                user.contact_number = update_data['contact_number']

            db.session.commit()
            return user.to_dict(), 200

        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}, 500


    @classmethod
    def get_user_by_id(cls, user_id: int) -> tuple[dict, int]:
        user = cls.query.get(user_id)
        if not user:
            return {"error": "User not found"}, 404
        return user.to_dict(), 200

    @classmethod
    def get_all_users(cls) -> tuple[list, int]:
        return [user.to_dict() for user in cls.query.all()], 200

    @classmethod
    def check_login(cls, email: str, password: str) -> tuple[bool, str]:
        user = cls.query.filter_by(email=email).first()
        if not user or not user.check_password(password):
            return False, "Invalid email or password"
        return True, "Login successful"

    @classmethod
    def search_users(cls, email=None, first_name=None, last_name=None, contact_number=None) -> list:
        if email:
            query = query.filter(cls.email == email)
        if first_name:
            query = query.filter(cls.first_name == first_name)
        if last_name:
            query = query.filter(cls.last_name == last_name)
        if contact_number:
            query = query.filter(cls.contact_number == contact_number)

        return [user.to_dict() for user in cls.query.all()]

    @classmethod
    def delete_user(cls, user_id: int) -> tuple[dict, int]:
        user = cls.query.get(user_id)
        if not user:
            return {"error": "User not found"}, 404

        db.session.delete(user)
        db.session.commit()
        return {"message": "User deleted successfully"}, 200

    @classmethod
    def suspend_user(cls, user_id: int) -> tuple[dict, int]:
        user = cls.query.get(user_id)
        if not user:
            return {"error": "User not found"}, 404

        try:
            if user.type_of_user == "suspended":
                return {"error": "User is already suspended"}, 400

            user.type_of_user = "suspended"
            db.session.commit()
            return {"message": f"User {user.email} suspended successfully."}, 200

        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}, 500