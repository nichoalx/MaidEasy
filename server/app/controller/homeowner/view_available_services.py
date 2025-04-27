from flask import Blueprint, jsonify
from server.app.entity.cleaner import Cleaner

view_available_services_blueprint = Blueprint('view_available_services', __name__)

class ViewAvailableServicesController:
    @view_available_services_blueprint.route('/api/homeowner/view_available_services', methods=['GET'])
    def view_available_services():
        services = Cleaner.get_all_services()  # assuming this function returns available services
        return jsonify({'services': services, 'message': 'Available services retrieved successfully'}), 200
