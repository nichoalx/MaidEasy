from flask import Blueprint, request, jsonify
from server.app.entity.homeowner import Homeowner
from server.app.controller.auth.permission_required import login_required

view_bookings_blueprint = Blueprint('view_past_bookings', __name__)

class ViewPastBookingsController:
    @login_required
    @view_bookings_blueprint.route('/api/homeowner/view_past_bookings', methods=['GET'])
    def view_past_bookings():
        # Get query parameters
        homeowner_id = request.args.get('homeowner_id')
        
        # Validate homeowner_id
        if not homeowner_id:
            return jsonify({'error': 'Homeowner ID is required'}), 400
            
        # Get homeowner by ID
        homeowner = Homeowner.query.get(homeowner_id)
        if not homeowner:
            return jsonify({'error': 'Homeowner not found'}), 404
            
        # Get all past bookings
        response, status_code = homeowner.view_past_bookings()
        
        return jsonify({
            'past_bookings': response,
            'message': 'view_past_bookings API called'
        }), status_code