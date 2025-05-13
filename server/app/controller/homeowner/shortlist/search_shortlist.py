from flask import Blueprint, request, jsonify
from flask_jwt_extended import get_jwt_identity
from server.app.entity.shortlist import HomeownerShortlist
from server.app.controller.auth.permission_required import login_required

search_shortlist_blueprint = Blueprint('search_shortlist', __name__)

class SearchShortlistController:
    @search_shortlist_blueprint.route('/api/homeowner/search_shortlist', methods=['GET'])
    @login_required
    def search_shortlist():
        user_id = get_jwt_identity()
        name = request.args.get('name')
        category = request.args.get('category')

        response, status = HomeownerShortlist.search_shortlisted_services(user_id, name, category)
        return jsonify({"filtered_shortlisted_services": response}), status