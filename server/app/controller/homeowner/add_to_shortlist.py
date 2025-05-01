from flask import Blueprint, request, jsonify
from server.app.entity.homeowner import Homeowner
from server.app.controller.auth.permission_required import login_required

shortlist_add_blueprint = Blueprint('save_to_shortlist', __name__)

class SaveToShortlistController:
    @login_required
    @shortlist_add_blueprint.route('/api/homeowner/add_to_shortlist', methods=['POST'])
    def add_to_shortlist():
        data = request.get_json()
        
        homeowner_id = data.get('homeowner_id')
        cleaner_id = data.get('cleaner_id')
        
        # Get homeowner by ID
        homeowner_result, status_code = Homeowner.get_homeowner_by_id(homeowner_id)
        
        if status_code != 200:
            return jsonify({'error': homeowner_result.get('error')}), status_code
        
        # Create homeowner instance to call the instance method
        homeowner = Homeowner.query.get(homeowner_id)
        response, status_code = homeowner.add_cleaner_to_shortlist(cleaner_id)
        
        return jsonify({
            'success': status_code == 200,
            'message': response.get('message', response.get('error'))
        }), status_code