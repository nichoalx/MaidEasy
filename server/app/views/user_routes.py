from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.controller import UserController
from app.controller.auth_controller import AuthController
from app.entity.user import User

user_routes = Blueprint('user_routes', __name__, url_prefix='/api')
user_controller = UserController()
auth_controller = AuthController()

# POST create a new user (Admin only)
@user_routes.route('/users', methods=['POST'])
@auth_controller.admin_required
def create_user():
    data = request.get_json()
    result = user_controller.create_user(data)
    if 'error' in result:
        return jsonify(result), 400
    return jsonify(result), 201

# GET all users (Admin only)
@user_routes.route('/users', methods=['GET'])
@auth_controller.admin_required
def get_all_users():
    users = user_controller.get_all_users()
    if not users:
        return jsonify({"message": "No users found"}), 404
    return jsonify(users), 200

# GET user by ID (Admin or same user)
@user_routes.route('/users/<int:user_id>', methods=['GET'])
@jwt_required()
def get_user_by_id(user_id):
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    # Allow access if admin or same user
    if not (user.type_of_user == 'admin' or current_user_id == user_id):
        return jsonify({"error": "Unauthorized access"}), 403
        
    result = user_controller.get_user_by_id(user_id)
    if 'error' in result:
        return jsonify(result), 404
    return jsonify(result), 200

# PUT update user by ID (Admin or same user)
@user_routes.route('/users/<int:user_id>', methods=['PUT'])
@jwt_required()
def update_user(user_id):
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    # Allow access if admin or same user
    if not (user.type_of_user == 'admin' or current_user_id == user_id):
        return jsonify({"error": "Unauthorized access"}), 403
        
    data = request.get_json()
    result = user_controller.update_user(user_id, data)
    if 'error' in result:
        return jsonify(result), 400
    return jsonify(result), 200

# DELETE user by ID (Admin only)
@user_routes.route('/users/<int:user_id>', methods=['DELETE'])
@auth_controller.admin_required
def delete_user(user_id):
    result = user_controller.delete_user(user_id)
    if 'error' in result:
        return jsonify(result), 400
    return jsonify(result), 200

# Search users (Admin only)
@user_routes.route('/users/search', methods=['GET'])
@auth_controller.admin_required
def search_users():
    query = request.args.get('query', '')
    users = user_controller.search_users(query)
    return jsonify(users), 200