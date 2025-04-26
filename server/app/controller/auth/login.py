from flask import Blueprint, request, jsonify, session
from server.app.entity.user import User

login_blueprint = Blueprint('login', __name__)

class LoginController:
    @login_blueprint.route('/api/auth/login', methods=['POST'])
    def login():
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        success, message = User.check_login(email, password)
        if not success:
            return jsonify({"error": message}), 401

        session['email'] = email
        session['logged_in'] = True
        # Optionally, save type_of_user if you want
        user = User.query.filter_by(email=email).first()
        session['type_of_user'] = user.type_of_user

        return jsonify({"message": "Login successful", "type_of_user": user.type_of_user}), 200
