from flask import request, jsonify
from werkzeug.security import check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from app.entity import User
from functools import wraps

class AuthController:
    def __init__(self):
        pass

    def login(self):
        """Handle user login for admin-created accounts"""
        data = request.get_json()
        
        # Validate input
        if not data or not data.get('email') or not data.get('password'):
            return jsonify({"error": "Email and password are required"}), 400
            
        # Find user
        user = User.query.filter_by(email=data['email']).first()
        
        # Verify user exists and password is correct
        if not user or not check_password_hash(user.password, data['password']):
            return jsonify({"error": "Invalid credentials"}), 401
            
        # Create JWT token with additional claims
        additional_claims = {
            "type_of_user": user.type_of_user,
            "email": user.email
        }
        access_token = create_access_token(
            identity=user.id,
            additional_claims=additional_claims
        )
        
        return jsonify({
            "message": "Login successful",
            "access_token": access_token,
            "user": user.to_dict()
        })

    @jwt_required()
    def verify_token(self):
        """Verify the JWT token and return user data"""
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if not user:
            return jsonify({"error": "User not found"}), 404
            
        return jsonify({
            "isValid": True,
            "user": user.to_dict()
        })

    @jwt_required()
    def logout(self):
        """Handle user logout"""
        # Client-side should remove the token
        return jsonify({"message": "Logout successful"}), 200

    @staticmethod
    def admin_required(fn):
        """Decorator to require admin privileges"""
        @wraps(fn)
        @jwt_required()
        def wrapper(*args, **kwargs):
            current_user_id = get_jwt_identity()
            user = User.query.get(current_user_id)
            
            if not user or user.type_of_user != 'admin':
                return jsonify({"error": "Admin privileges required"}), 403
                
            return fn(*args, **kwargs)
        return wrapper