from flask import Blueprint, request, jsonify
from server.app.entity.homeowner import Homeowner
from server.app.controller.auth.permission_required import login_required

search_bookings_blueprint = Blueprint('search_past_bookings', __name__)

class SearchPastBookingsController:
    @login_required
    @search_bookings_blueprint.route('/api/homeowner/search_past_bookings', methods=['GET'])
    def search_past_bookings():
        # Get query parameters
        homeowner_id = request.args.get('homeowner_id')
        cleaner_name = request.args.get('cleaner_name')
        service_type = request.args.get('service_type')
        start_date = request.args.get('start_date')
        end_date = request.args.get('end_date')
        
        # Validate homeowner_id
        if not homeowner_id:
            return jsonify({'error': 'Homeowner ID is required'}), 400
            
        # Get homeowner by ID
        homeowner = Homeowner.query.get(homeowner_id)
        if not homeowner:
            return jsonify({'error': 'Homeowner not found'}), 404
            
        # Search past bookings with filters
        response, status_code = homeowner.search_past_bookings(
            cleaner_name=cleaner_name,
            service_type=service_type,
            start_date=start_date,
            end_date=end_date
        )
        
        return jsonify({
            'past_bookings': response,
            'message': 'search_past_bookings API called'
        }), status_code