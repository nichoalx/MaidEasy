from flask import Blueprint, request, jsonify
from server.app.entity.user import User
from server.app.controller.auth.permission_required import admin_required

create_user_blueprint = Blueprint('create_user', __name__)

class CreateUserController:
    @admin_required
    @create_user_blueprint.route('/api/users/create_user', methods=['POST'])
    def create_user():
        data = request.get_json()

        first_name = data.get('first_name')
        last_name = data.get('last_name')
        email = data.get('email')
        password = data.get('password')
        dob = data.get('dob')
        contact_number = data.get('contact_number')
        type_of_user = data.get('type_of_user')

        response, status_code = User.create_user(
            first_name=first_name,
            last_name=last_name,
            email=email,
            password=password,
            dob=dob,
            contact_number=contact_number,
            type_of_user=type_of_user
        )

        return jsonify({'success': response, 'message': 'create_user API called'}), status_code
