from flask import Blueprint, request, jsonify
from app.controller import UserController

user_admin_routes = Blueprint('user_admin_routes', __name__)
user_controller = UserController()

# POST create a new user
@user_admin_routes.route('/api/users', methods=['POST'])
def create_user():
    data = request.get_json()
    result = user_controller.create_user(data)
    if 'error' in result:
        return jsonify(result), 400
    return jsonify(result), 201

# GET all users
@user_admin_routes.route('/api/users', methods=['GET'])
def get_all_users():
    users = user_controller.get_all_users()
    if not users:
        return jsonify({"message": "No users found"}), 404
    return jsonify(users), 200

# GET user by ID
@user_admin_routes.route('/api/users/<int:user_id>', methods=['GET'])
def get_user_by_id(user_id):
    user = user_controller.get_user_by_id(user_id)
    if not user:
        return jsonify({"message": "User not found"}), 404
    return jsonify(user), 200

# PUT update user by ID
@user_admin_routes.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    data = request.get_json()
    result = user_controller.update_user(user_id, data)
    if 'error' in result:
        return jsonify(result), 400
    return jsonify(result), 200

# DELETE user by ID
@user_admin_routes.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    result = user_controller.delete_user(user_id)
    if 'error' in result:
        return jsonify(result), 400
    return jsonify(result), 200

