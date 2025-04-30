from flask import Blueprint, jsonify
from server.app.entity.user import User
from server.app.controller.auth.permission_required import admin_required, login_required

get_user_by_id_blueprint = Blueprint('get_user_by_id', __name__)

class GetUserByIdController:
    @admin_required
    @login_required
    @get_user_by_id_blueprint.route('/api/users/<int:user_id>', methods=['GET'])
    def get_user_by_id(user_id):
        response, status_code = User.get_user_by_id(user_id)
        return jsonify({'success': response, 'message': 'get_user_by_id API called'}), status_code
