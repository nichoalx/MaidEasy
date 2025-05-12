from flask import Blueprint, request, jsonify
from server.app.entity.service import Service
from server.app.controller.auth.permission_required import login_required

view_services_blueprint = Blueprint('view_services', __name__)

class ViewServicesController:
    @login_required
    @view_services_blueprint.route('/api/homeowner/view_services', methods=['GET'])
    def view_services():
        services, status = Service.get_all_services()
        return jsonify({"services": services, "message": "view_services API called"}), status