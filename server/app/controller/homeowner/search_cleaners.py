from flask import Blueprint, request, jsonify
from server.app.entity.homeowner import Homeowner
from server.app.controller.auth.permission_required import login_required

search_cleaner_blueprint = Blueprint('search_cleaner', __name__)

class SearchCleanerController:
    @login_required
    @search_cleaner_blueprint.route('/api/homeowner/search_cleaner', methods=['GET'])
    def search_cleaner():
        # Get query parameters
        name = request.args.get('name')
        service_type = request.args.get('service_type')
        rating = request.args.get('rating')
        location = request.args.get('location')
        
        # Search cleaners based on filters
        response, status_code = Homeowner.search_cleaners(
            name=name,
            service_type=service_type,
            rating=rating,
            location=location
        )
        
        return jsonify({
            'cleaners': response,
            'message': 'search_cleaner API called'
        }), status_code