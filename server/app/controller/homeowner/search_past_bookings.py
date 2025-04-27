from flask import Blueprint, request, jsonify, session
from server.app.entity.homeowner import HomeOwner

search_past_bookings_blueprint = Blueprint('search_past_bookings', __name__)

class SearchPastBookingsController:
    @search_past_bookings_blueprint.route('/api/homeowner/search_past_bookings', methods=['GET'])
    def search_past_bookings():
        if 'homeowner_id' not in session:
            return jsonify({"error": "Homeowner not logged in"}), 401
        
        homeowner_id = session['homeowner_id']
        date = request.args.get('date')
        status = request.args.get('status')
        
        bookings = HomeOwner.search_past_bookings(homeowner_id, date, status)
        return jsonify({'bookings': bookings, 'message': 'Past bookings search result retrieved successfully'}), 200
