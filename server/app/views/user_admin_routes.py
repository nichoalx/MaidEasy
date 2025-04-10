from flask import Blueprint, request, jsonify
from app.controller.user_controller import UserController

user_admin_routes = Blueprint('user_admin_routes', __name__)
user_controller = UserController()

# Route to get all users
@user_admin_routes.route('/api/users', methods=['GET'])
def get_all_users():
    users = user_controller.get_all_users()
    return jsonify(users), 200

# Route to create a new user
@user_admin_routes.route('/api/users', methods=['POST'])
def create_user():
    data = request.json
    result = user_controller.create_user(data)
    return jsonify(result), 201

# Route to get a user by ID
@user_admin_routes.route('/api/users/<int:user_id>', methods=['GET'])
def get_user_by_id(user_id):
    result = user_controller.get_user_by_id(user_id)
    return jsonify(result), 200 if "error" not in result else 404

# Route to update a user by ID
@user_admin_routes.route('/api/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    data = request.json
    result = user_controller.update_user(user_id, data)
    return jsonify(result), 200 if "error" not in result else 404

# Route to delete a user by ID
@user_admin_routes.route('/api/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    result = user_controller.delete_user(user_id)
    return jsonify(result), 200 if "error" not in result else 404

# Route to search users by query
@user_admin_routes.route('/api/users/search', methods=['GET'])
def search_users():
    query = request.args.get('query', '')
    results = user_controller.search_users(query)
    return jsonify(results), 200