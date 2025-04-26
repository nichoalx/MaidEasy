from flask import Blueprint, jsonify
from server.app.entity.user import User
from server.app.controller.auth.permission_required import admin_required

get_all_users_blueprint = Blueprint('get_all_users', __name__)

class GetAllUsersController:
    @admin_required
    @get_all_users_blueprint.route('/api/users', methods=['GET'])
    def get_all_users():
        response, status_code = User.get_all_users()
        return jsonify({'success': response, 'message': 'get_all_users API called'}), status_code
