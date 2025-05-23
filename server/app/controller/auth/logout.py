from flask import Blueprint, jsonify, session
from server.app.entity.user import User

logout_blueprint = Blueprint('logout', __name__)

class LogoutController:
    @logout_blueprint.route('/api/auth/logout', methods=['POST'])
    def logout():
        # With JWT, logout is handled on the client by deleting the token
        return jsonify({"message": "Logout successful - token should be deleted client-side"}), 200