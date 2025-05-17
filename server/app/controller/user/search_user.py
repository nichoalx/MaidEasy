from flask import Blueprint, request, jsonify
from server.app.entity.user import User
from server.app.controller.auth.permission_required import admin_required, login_required

search_user_blueprint = Blueprint('search_user', __name__)

class SearchUserController:
    @admin_required
    @login_required
    @search_user_blueprint.route('/api/users/search', methods=['GET'])
    def search_user():
        email = request.args.get('email')
        first_name = request.args.get('first_name')
        last_name = request.args.get('last_name')
        contact_number = request.args.get('contact_number')

        response, status_code = User.search_users(
            email=email,
            first_name=first_name,
            last_name=last_name,
            contact_number=contact_number
        )

        return jsonify({'success': response, 'message': 'search_user API called'}),  status_code
