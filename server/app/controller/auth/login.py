from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from datetime import timedelta

from server.app.entity.user import User
from server.app.entity.profile import Profile

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

        user = User.query.filter_by(email=email).first()
        profile = Profile.query.get(user.profile_id)

        access_token = create_access_token(
            identity=str(user.user_id),
            expires_delta=timedelta(days=1),  # 24-hour session
            additional_claims={"role": profile.role_name}
        )

        return jsonify({
            "message": "Login successful",
            "access_token": access_token,
            "user_id": user.user_id,
            "role": profile.role_name
        }), 200