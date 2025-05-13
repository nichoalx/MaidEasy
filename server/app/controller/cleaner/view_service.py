from flask import Blueprint, jsonify
from flask_jwt_extended import get_jwt_identity
from server.app.entity.service import Service
from server.app.entity.profile import Profile
from server.app.entity.user import User
from server.app.controller.auth.permission_required import login_required

view_service_blueprint = Blueprint('view_service', _name_)

class ViewServiceController:
    @login_required
    @view_service_blueprint.route('/api/cleaner/my_services', methods=['GET'])
    def view_services():
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        profile = Profile.query.get(user.profile_id)

        if profile.role_name != "cleaner":
            return jsonify({"error": "Only cleaners can view services."}), 403

        services = Service.get_services_by_cleaner_id(current_user_id)
        if not services:
            return jsonify({"message": "No services found for this cleaner."}), 404

        return jsonify({"services": services, "message": "Cleaner services retrieved"}), 200

