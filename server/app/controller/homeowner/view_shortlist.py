from flask import Blueprint, request, jsonify
from server.app.entity.homeowner import Homeowner
from server.app.controller.auth.permission_required import login_required

view_shortlist_blueprint = Blueprint('view_shortlist', __name__)

class ViewShortlistController:
    @login_required
    @view_shortlist_blueprint.route('/api/homeowner/view_shortlist', methods=['GET'])
    def view_shortlist():
        # Get query parameters
        homeowner_id = request.args.get('homeowner_id')
        
        # Validate homeowner_id
        if not homeowner_id:
            return jsonify({'error': 'Homeowner ID is required'}), 400
            
        # Get homeowner by ID
        homeowner = Homeowner.query.get(homeowner_id)
        if not homeowner:
            return jsonify({'error': 'Homeowner not found'}), 404
            
        # Get all shortlisted cleaners
        response, status_code = homeowner.view_shortlisted_cleaners()
        
        return jsonify({
            'shortlisted_cleaners': response,
            'message': 'view_shortlist API called'
        }), status_code