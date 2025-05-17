from flask import Blueprint, request, jsonify
from server.app.entity.service import Service
from server.app.controller.auth.permission_required import login_required

view_services_blueprint = Blueprint('view_services', __name__)

class ViewServicesController:
    @login_required
    @view_services_blueprint.route('/api/homeowner/view_services/<int:service_id>', methods=['GET'])
    def view_services(service_id):
        data = request.get_json()
        # Increment the view count for the service
        Service.increment_view(service_id)
        
        service_id = data.get("service_id")
        services, status = Service.get_service_by_id(service_id)
        return jsonify({"services": services, "message": "view_services API called"}), status