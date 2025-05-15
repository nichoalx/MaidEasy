from flask import Blueprint, jsonify
from flask_jwt_extended import get_jwt_identity, get_jwt, jwt_required
from server.app.entity.bookings import Booking
from server.app.entity.user import User
from server.app.entity.profile import Profile
from server.app.controller.auth.permission_required import login_required

view_past_bookings_blueprint = Blueprint('view_past_bookings', __name__)

class ViewPastBookingsController:
    @view_past_bookings_blueprint.route('/api/homeowner/view_past_bookings', methods=['GET'])
    @jwt_required()
    @login_required
    def view_past_bookings():
        current_user_id = int(get_jwt_identity())
        claims = get_jwt()
        role_name = claims.get("role_name")

        # Get all bookings for current user
        bookings, status_code = Booking.get_booking_history(user_id=current_user_id)

        enriched_bookings = []
        for booking in bookings:
            data = dict(booking)
            if role_name == "cleaner":
                homeowner = User.query.get(data['homeowner_user_id'])
                data['homeowner_name'] = f"{homeowner.first_name} {homeowner.last_name}" if homeowner else "Unknown"
                del data['cleaner_user_id']
            elif role_name == "homeowner":
                cleaner = User.query.get(data['cleaner_user_id'])
                data['cleaner_name'] = f"{cleaner.first_name} {cleaner.last_name}" if cleaner else "Unknown"
                del data['homeowner_user_id']
            enriched_bookings.append(data)

        return jsonify(enriched_bookings), status_code
