from flask import Blueprint, jsonify, session
from server.app.entity.homeowner import HomeOwner

view_shortlist_blueprint = Blueprint('view_shortlist', __name__)

class ViewShortlistController:
    @view_shortlist_blueprint.route('/api/homeowner/view_shortlist', methods=['GET'])
    def view_shortlist():
        if 'homeowner_id' not in session:
            return jsonify({"error": "Homeowner not logged in"}), 401
        
        homeowner_id = session['homeowner_id']
        shortlisted_cleaners = HomeOwner.view_shortlisted_cleaners(homeowner_id)
        
        return jsonify({'shortlisted_cleaners': shortlisted_cleaners, 'message': 'Shortlist retrieved successfully'}), 200
