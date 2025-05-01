from flask import Blueprint, request, jsonify
from server.app.entity.homeowner import Homeowner
from server.app.controller.auth.permission_required import login_required

search_shortlist_blueprint = Blueprint('search_shortlist', __name__)

class SearchShortlistController:
    @login_required
    @search_shortlist_blueprint.route('/api/homeowner/search_shortlist', methods=['GET'])
    def search_shortlist():
        # Get query parameters
        homeowner_id = request.args.get('homeowner_id')
        name = request.args.get('name')
        service_type = request.args.get('service_type')
        
        # Validate homeowner_id
        if not homeowner_id:
            return jsonify({'error': 'Homeowner ID is required'}), 400
            
        # Get homeowner by ID
        homeowner = Homeowner.query.get(homeowner_id)
        if not homeowner:
            return jsonify({'error': 'Homeowner not found'}), 404
            
        # Search within shortlisted cleaners
        response, status_code = homeowner.search_shortlisted_cleaners(
            name=name,
            service_type=service_type
        )
        
        return jsonify({
            'cleaners': response,
            'message': 'search_shortlist API called'
        }), status_code