from flask import Blueprint, request, jsonify
from server.app.entity.user import User
from server.app.controller.auth.permission_required import admin_required

suspend_user_blueprint = Blueprint('suspend_user', __name__)

class SuspendUserController:
    @admin_required
    @suspend_user_blueprint.route('/api/users/<int:user_id>/suspend', methods=['PUT'])
    def suspend_user(user_id):
        data = request.get_json()
        response, status_code = User.suspend_user(user_id, data)
        return jsonify({'success': response, 'message': 'suspend_user API called'}), status_code