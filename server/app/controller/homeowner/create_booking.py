from flask import Blueprint, request, jsonify
from server.app.entity.bookings import Booking
from server.app.entity.user import User
from server.app.entity.profile import Profile
from flask_jwt_extended import get_jwt_identity, jwt_required
from server.app.controller.auth.permission_required import login_required

create_booking_blueprint = Blueprint('create_booking', __name__)

class CreateBookingController:
    @create_booking_blueprint.route('/api/homeowner/create_booking', methods=['POST'])
    @jwt_required()
    @login_required
    def create_booking():
        current_user_id = int(get_jwt_identity())
        user = User.query.get(current_user_id)
        profile = Profile.query.get(user.profile_id)

        if not profile or profile.has_booking_permission != True:
            return jsonify({"error": "Only users with the 'has_booking_permission' role can create bookings."}), 403

        data = request.get_json()
        cleaner_user_id = data.get("cleaner_user_id")
        service_id = data.get("service_id")

        response, status = Booking.create_booking(current_user_id, cleaner_user_id, service_id)
        return jsonify({"success": response, "message": "create_booking API called"}), status