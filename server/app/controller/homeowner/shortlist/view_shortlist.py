from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from server.app.entity.shortlist import HomeownerShortlist
from server.app.controller.auth.permission_required import login_required

view_shortlist_blueprint = Blueprint('view_shortlist', __name__)

class ViewShortlistController:
    @view_shortlist_blueprint.route('/api/homeowner/view_shortlist', methods=['GET'])
    @jwt_required()
    @login_required
    def view_shortlist():
        current_user_id = int(get_jwt_identity())
        data = request.get_json()
        service_name = data.get("service_name")
        category_name = data.get("category_name")
        response, status = HomeownerShortlist.view_shortlisted_services(current_user_id, service_name, category_name)
        return jsonify({"shortlisted_services": response}), status
