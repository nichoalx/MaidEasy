from flask import Blueprint, jsonify, session
from server.app.entity.homeowner import HomeOwner

view_past_booking_blueprint = Blueprint('view_past_booking', __name__)

class ViewPastBookingController:
    @view_past_booking_blueprint.route('/api/homeowner/view_past_booking/<int:booking_id>', methods=['GET'])
    def view_past_booking(booking_id):
        if 'homeowner_id' not in session:
            return jsonify({"error": "Homeowner not logged in"}), 401
        
        homeowner_id = session['homeowner_id']
        booking_details = HomeOwner.view_past_booking_details(homeowner_id, booking_id)
        
        return jsonify({'booking_details': booking_details, 'message': 'Past booking details retrieved successfully'}), 200
