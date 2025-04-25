# Libraries
from flask import current_app
from datetime import datetime
from typing_extensions import Self
from werkzeug.security import generate_password_hash, check_password_hash

# Local dependencies
from ..extensions import db
# from .profile import Profile TO ADD LATER
class User(db.Model):
    __tablename__ = 'users'
    
    user_id = db.Column(db.Integer, primary_key=True, autoIncrement=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    dob = db.Column(db.String(50), nullable=False)
    contact_number = db.Column(db.String(15), nullable=False)
    type_of_user = db.Column(db.String(20), nullable=False)

    # ADD LATER WHEN PROFILE IS READY
    # Foreign key to the Profile model
    # user_profile = db.Column(db.String(100), db.ForeignKey('profiles.name'), nullable=False)

    # Relationship with Profile model
    # profile = db.relationship('Profile', backref='users')

    def set_password(self, password): # Hash the password before storing it.
        self.password = generate_password_hash(password)

    def check_password(self, password) -> bool: # Check the hashed password against the provided password.
        return check_password_hash(self.password, password)

    def to_dict(self) -> dict[Self]: # Convert the User object to a dictionary for JSON serialization.
        return {
            'user_id': self.user_id,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'dob': self.dob.isoformat(),
            'contact_number': self.contact_number,
            'type_of_user': self.type_of_user
        }
    
    @classmethod
    def createUser(cls, first_name: str, last_name: str, 
                   email: str, password: str, 
                   dob: str, contact_number: str, 
                   type_of_user: str) -> tuple[bool, str]: # Create a new user in the database.
        
        if cls.query.filter_by(email=email).one_or_none():
            return False, "Email already exists"
        
        if not email or not password or not dob: # or not user_profile: TO DO LATER # Validate fields
            return False, 400
        
        # if not Profile.queryUserProfile(profile_name=user_profile): TO DO LATER
        #     return False, 404

        if type_of_user == "admin":
            return False, "Admin user creation is not allowed"
        
        try:
            dob = datetime.strptime(dob, '%Y-%m-%d').date()
        except ValueError:
            return False, "Invalid date format. Use YYYY-MM-DD."
        
        new_user = cls(
            first_name=first_name,
            last_name=last_name,
            email=email,
            password=generate_password_hash(password),
            dob=datetime.strptime(dob, '%Y-%m-%d').date(),
            contact_number=contact_number,
            type_of_user=type_of_user
        )
        
        with current_app.app_context():
            db.session.add(new_user)
            db.session.commit()
        
        return True, "User created successfully"
    
    @classmethod
    def updateUser(cls, user_id: int, first_name: str, last_name: str, 
                   email: str, password: str, dob: str, 
                   contact_number: str, type_of_user: str) -> tuple[bool, str]:
        try:
            user = cls.queryUser(email)

            if not user:
                return False, "User not found"
            
            if first_name is not None:
                user.first_name = first_name
            if last_name is not None:
                user.last_name = last_name
            if email is not None:
                user.email = email
            if password is not None:
                user.set_password(password)
            if dob is not None:
                user.dob = datetime.strptime(dob, '%Y-%m-%d').date()
            if contact_number is not None:
                user.contact_number = contact_number
            if type_of_user is not None:
                user.type_of_user = type_of_user
            
            db.session.commit()
            return True, "User updated successfully"
        
        except Exception as e:
            db.session.rollback()
            return False, str(e)
        
    @classmethod
    def queryUser(cls, email: str) -> tuple[bool, str]: # Query a user by their email.
        return cls.query.filter_by(email=email).one_or_none()
    
    @classmethod
    def queryAllUsers(cls) -> list[Self]: # Query all users in the database.
        return cls.query.all() 
    
    @classmethod
    def checkLogin(cls, email:str, password: str) -> tuple[bool, str]: # Check if the user can log in with the provided credentials.
        user = cls.queryUser(email)
        if not user or not user.check_password(password):
            return False, "Invalid email or password"
        

        return True, "Login successful"
    
    @classmethod
    def searchUser(cls, email, first_name, last_name, contact_number) -> list[Self]:
        query = cls.query
        
        if email:
            query = query.filter(cls.email == email)
        if first_name:
            query = query.filter(cls.first_name == first_name)
        if last_name:
            query = query.filter(cls.last_name == last_name)
        if contact_number:
            query = query.filter(cls.contact_number == contact_number)

        users = query.all()
        user_list = [user.to_dict() for user in users]
        return user_list 

    @classmethod
    def viewUser(cls, user_id: int) -> dict:
        user = cls.queryUser(user_id)

        if not user:
            return False, "User not found"
        
        return user.to_dict(), 200
    



  