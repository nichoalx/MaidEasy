# controllers/homeowner/delete_from_shortlist.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import get_jwt_identity
from server.app.entity.shortlist import HomeownerShortlist
from server.app.controller.auth.permission_required import login_required

delete_from_shortlist_blueprint = Blueprint('delete_from_shortlist', __name__)

class DeleteFromShortlistController:
    @delete_from_shortlist_blueprint.route('/api/homeowner/delete_from_shortlist', methods=['DELETE'])
    @login_required
    def delete_from_shortlist():
        user_id = get_jwt_identity()
        data = request.get_json()
        service_id = data.get("service_id")

        response, status = HomeownerShortlist.remove_service_from_shortlist(user_id, service_id)
        return jsonify({"message": response}), status   