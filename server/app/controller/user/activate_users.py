from flask import Blueprint, request, jsonify
from server.app.entity.user import User
from server.app.controller.auth.permission_required import admin_required, login_required

activate_user_blueprint = Blueprint('activate_user', __name__)

class SuspendUserController:
    @admin_required
    @login_required
    @activate_user_blueprint.route('/api/users/activate/<int:user_id>', methods=['PUT'])
    def suspend_user(user_id):
        response, status_code = User.activate_user(user_id)
        return jsonify({'success': response, 'message': 'activate_user API called'}), status_code