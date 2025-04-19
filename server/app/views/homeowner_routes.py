from flask import Blueprint, request, jsonify
from app.controller import HomeownerController

homeowner_routes = Blueprint('homeowner_routes', __name__)
homeowner_controller = HomeownerController()

@homeowner_routes.route('/api/homeowners', methods=['GET'])
def get_all_homeowners():
    homeowners = homeowner_controller.get_all_homeowners()
    return jsonify(homeowners), 200

@homeowner_routes.route('/api/homeowners/<int:homeowner_id>', methods=['GET'])
def get_homeowner_by_id(homeowner_id):
    homeowner = homeowner_controller.get_homeowner_by_id(homeowner_id)
    if not homeowner:
        return jsonify({"message": "Homeowner not found"}), 404
    return jsonify(homeowner), 200

@homeowner_routes.route('/api/homeowners', methods=['POST'])
def create_homeowner():
    data = request.get_json()
    result = homeowner_controller.create_homeowner(data)
    return jsonify(result), 201

@homeowner_routes.route('/api/homeowners/<int:homeowner_id>', methods=['PUT'])
def update_homeowner(homeowner_id):
    data = request.get_json()
    result = homeowner_controller.update_homeowner(homeowner_id, data)
    if 'error' in result:
        return jsonify(result), 404
    return jsonify(result), 200

@homeowner_routes.route('/api/homeowners/<int:homeowner_id>', methods=['DELETE'])
def delete_homeowner(homeowner_id):
    result = homeowner_controller.delete_homeowner(homeowner_id)
    if 'error' in result:
        return jsonify(result), 404
    return jsonify(result), 200
