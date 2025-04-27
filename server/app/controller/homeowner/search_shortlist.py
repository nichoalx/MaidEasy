from flask import Blueprint, request, jsonify, session
from server.app.entity.homeowner import HomeOwner

search_shortlist_blueprint = Blueprint('search_shortlist', __name__)

class SearchShortlistController:
    @search_shortlist_blueprint.route('/api/homeowner/search_shortlist', methods=['GET'])
    def search_shortlist():
        if 'homeowner_id' not in session:
            return jsonify({"error": "Homeowner not logged in"}), 401
        
        homeowner_id = session['homeowner_id']
        query = request.args.get('query')
        
        search_results = HomeOwner.search_shortlist(homeowner_id, query)
        
        return jsonify({'search_results': search_results, 'message': 'Search result from shortlist'}), 200
