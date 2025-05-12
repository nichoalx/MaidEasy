from flask import Blueprint, request, jsonify
from flask_jwt_extended import get_jwt_identity
from server.app.entity.shortlist import HomeownerShortlist
from server.app.entity.service import Service
from server.app.controller.auth.permission_required import login_required

add_to_shortlist_blueprint = Blueprint('add_to_shortlist', __name__)

class AddToShortlistController:
    @add_to_shortlist_blueprint.route('/api/homeowner/add_to_shortlist', methods=['POST'])
    @login_required
    def add_to_shortlist():
        user_id = get_jwt_identity()
        data = request.get_json()
        service_id = data.get("service_id")

        # Validate service existence
        service = Service.query.get(service_id)
        if not service:
            return jsonify({"error": "Service not found"}), 404

        response, status = HomeownerShortlist.add_service_to_shortlist(user_id, service_id)
        return jsonify({"success": response, "message": "Service added to shortlist"}), status
