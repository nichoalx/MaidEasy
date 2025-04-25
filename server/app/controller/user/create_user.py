from flask import Blueprint, request, jsonify
from server.app.entity.user import User

create_user_blueprint = Blueprint('create_user', __name__)

class UserController:
    # TO ADD LATER @auth_required(has_role='admin')
    @create_user_blueprint.route('/api/users/create_user', methods=['POST'])
    def create_user():
        data = request.get_json()

        if not data:
            return jsonify({"error": "No data provided"}), 400
        
        first_name = data.get('first_name')
        last_name = data.get('last_name')
        email = data.get('email')
        password = data.get('password')
        dob = data.get('dob')
        contact_number = data.get('contact_number')
        type_of_user = data.get('type_of_user')

        create_response, status_code = User.createUser(first_name, last_name, email, password, dob, contact_number, type_of_user)

        return jsonify({'success': create_response, 'message': 'create_user API called'}), status_code
