from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity, get_jwt, jwt_required
from server.app.entity.bookings import Booking
from server.app.entity.user import User
from server.app.entity.profile import Profile
from server.app.controller.auth.permission_required import login_required

view_booking_details_blueprint = Blueprint('view_booking_details', __name__)

class ViewBookingDetailsController:
    @view_booking_details_blueprint.route('/api/homeowner/view_booking_details/<int:booking_id>', methods=['GET'])
    @jwt_required()
    @login_required
    def view_booking_details(booking_id):
        current_user_id = int(get_jwt_identity())
        user = User.query.get(current_user_id)
        profile = Profile.query.get(user.profile_id)

        data = request.get_json()
        booking_id = data.get("booking_id")

        if profile.role_name != "homeowner":
            return jsonify({"error": "Only homeowner can view booking details."}), 403
        
        booking = Booking.get_booking_by_id(booking_id)
        return jsonify({"booking": booking, "message": "Booking details retrieved"}), 200