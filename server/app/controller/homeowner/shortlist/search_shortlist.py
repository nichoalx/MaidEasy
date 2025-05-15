from flask import Blueprint, request, jsonify
from flask_jwt_extended import get_jwt_identity, jwt_required
from server.app.entity.shortlist import HomeownerShortlist
from server.app.controller.auth.permission_required import login_required

search_shortlist_blueprint = Blueprint('search_shortlist', __name__)

class SearchShortlistController:
    @search_shortlist_blueprint.route('/api/homeowner/search_shortlist', methods=['GET'])
    @jwt_required()
    @login_required
    def search_shortlist():
        current_user_id = int(get_jwt_identity())
        response, status = HomeownerShortlist.search_shortlisted_services(current_user_id)
        return jsonify({"filtered_shortlisted_services": response}), status