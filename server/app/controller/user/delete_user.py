from flask import Blueprint, jsonify
from server.app.entity.user import User
from server.app.controller.auth.permission_required import admin_required, login_required

delete_user_blueprint = Blueprint('delete_user', __name__)

class DeleteUserController:
    @admin_required
    @login_required
    @delete_user_blueprint.route('/api/users/delete/<int:user_id>', methods=['DELETE'])
    def delete_user(user_id):
        response, status_code = User.delete_user(user_id)
        return jsonify({'success': response, 'message': 'delete_user API called'}), status_code