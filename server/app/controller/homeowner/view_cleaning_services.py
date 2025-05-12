from flask import Blueprint, jsonify
from server.app.entity.homeowner import Homeowner
from server.app.controller.auth.permission_required import login_required

view_services_blueprint = Blueprint('view_cleaning_services', __name__)

class ViewCleaningServicesController:
    @login_required
    @view_services_blueprint.route('/api/homeowner/view_cleaning_services', methods=['GET'])
    def view_cleaning_services():
        # Get all cleaning services
        response, status_code = Homeowner.view_cleaning_services()
        
        return jsonify({
            'services': response,
            'message': 'view_cleaning_services API called'
        }), status_code