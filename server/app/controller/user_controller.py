from app.entity import User
from app.extensions import db
from werkzeug.security import generate_password_hash

class UserController:
    def get_all_users(self):
        """Retrieve all users from the database."""
        users = User.query.all()
        return [user.to_dict() for user in users]

    def create_user(self, data):
        """Create a new user and save it to the database."""
        user = User(
            first_name=data.get('first_name'),
            last_name=data.get('last_name'),
            dob=data.get('dob'),
            contact_number=data.get('contact_number'),
            email=data.get('email'),
            password=data.get('password'),  # Pass the plain text password
            type_of_user=data.get('type_of_user')
        )
        if user:
            db.session.add(user)
            db.session.commit()
            return {"message": "User created successfully", "user": user.to_dict()}
        return {"error": "User creation failed"}

    def get_user_by_id(self, user_id):
        """Retrieve a user by their ID."""
        user = User.query.get(user_id)
        if user:
            return user.to_dict()
        return {"error": "User not found"}

    def update_user(self, user_id, data):
        """Update an existing user's details."""
        user = User.query.get(user_id)
        if user:
            user.first_name = data.get('first_name', user.first_name)
            user.last_name = data.get('last_name', user.last_name)
            user.dob = data.get('dob', user.dob)
            user.contact_number = data.get('contact_number', user.contact_number)
            user.email = data.get('email', user.email)
            if 'password' in data:
                user.password_hash = generate_password_hash(data['password'])
            user.type_of_user = data.get('type_of_user', user.type_of_user)
            db.session.commit()
            return {"message": "User updated successfully", "user": user.to_dict()}
        return {"error": "User not found"}

    def delete_user(self, user_id):
        """Delete a user by their ID."""
        user = User.query.get(user_id)
        if user:
            db.session.delete(user)
            db.session.commit()
            return {"message": "User deleted successfully"}
        return {"error": "User not found"}

    def search_users(self, query):
        """Search for users by their first or last name."""
        users = User.query.filter(
            (User.first_name.ilike(f"%{query}%")) | (User.last_name.ilike(f"%{query}%"))
        ).all()
        return [user.to_dict() for user in users]
