from flask import Blueprint, jsonify
from flask_jwt_extended import get_jwt_identity
from server.app.entity.shortlist import HomeownerShortlist
from server.app.controller.auth.permission_required import login_required

view_shortlist_blueprint = Blueprint('view_shortlist', __name__)

class ViewShortlistController:
    @view_shortlist_blueprint.route('/api/homeowner/view_shortlist', methods=['GET'])
    @login_required
    def view_shortlist():
        user_id = get_jwt_identity()
        response, status = HomeownerShortlist.view_shortlisted_services(user_id)
        return jsonify({"shortlisted_services": response}), status
