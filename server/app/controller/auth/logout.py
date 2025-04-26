from flask import Blueprint, jsonify, session
from server.app.entity.user import User

logout_blueprint = Blueprint('logout', __name__)

class LogoutController:
    @logout_blueprint.route('/api/auth/logout', methods=['POST'])
    def logout():
        # Clear the session
        session.clear()
        return jsonify({"message": "Logout successful"}), 200