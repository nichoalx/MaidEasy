from flask import Blueprint, request, jsonify
from app.controller import CleanerController

cleaner_routes = Blueprint('cleaner_routes', __name__)
cleaner_controller = CleanerController()

@cleaner_routes.route('/api/cleaners', methods=['GET'])
def get_all_cleaners():
    cleaners = cleaner_controller.get_all_cleaners()
    return jsonify(cleaners), 200

@cleaner_routes.route('/api/cleaners/<int:cleaner_id>', methods=['GET'])
def get_cleaner_by_id(cleaner_id):
    cleaner = cleaner_controller.get_cleaner_by_id(cleaner_id)
    if not cleaner:
        return jsonify({"message": "Cleaner not found"}), 404
    return jsonify(cleaner), 200

@cleaner_routes.route('/api/cleaners', methods=['POST'])
def create_cleaner():
    data = request.get_json()
    result = cleaner_controller.create_cleaner(data)
    return jsonify(result), 201

@cleaner_routes.route('/api/cleaners/<int:cleaner_id>', methods=['PUT'])
def update_cleaner(cleaner_id):
    data = request.get_json()
    result = cleaner_controller.update_cleaner(cleaner_id, data)
    if 'error' in result:
        return jsonify(result), 404
    return jsonify(result), 200

@cleaner_routes.route('/api/cleaners/<int:cleaner_id>', methods=['DELETE'])
def delete_cleaner(cleaner_id):
    result = cleaner_controller.delete_cleaner(cleaner_id)
    if 'error' in result:
        return jsonify(result), 404
    return jsonify(result), 200
