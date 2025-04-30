from flask import Blueprint, request, jsonify
from server.app.entity.user import User
from server.app.controller.auth.permission_required import admin_required, login_required

update_user_blueprint = Blueprint('update_user', __name__)

class UpdateUserController:
    @admin_required
    @login_required
    @update_user_blueprint.route('/api/users/<int:user_id>', methods=['PUT'])
    def update_user(user_id):
        data = request.get_json()
        response, status_code = User.update_user(user_id, data)
        return jsonify({'success': response, 'message': 'update_user API called'}), status_code
