from flask import Blueprint, request, jsonify
from server.app.entity.service import Service
from server.app.entity.user import User
from server.app.entity.profile import Profile
from flask_jwt_extended import get_jwt_identity, jwt_required
from server.app.controller.auth.permission_required import login_required

search_my_service_blueprint = Blueprint('search_my_service', __name__)

class SearchServiceController:
    @search_my_service_blueprint.route('/api/cleaner/my_services', methods=['GET'])
    @jwt_required()
    @login_required
    def search_service():
        current_user_id = int(get_jwt_identity())
        user = User.query.get(current_user_id)
        profile = Profile.query.get(user.profile_id)
        cleaner_id = get_jwt_identity()

        if profile.role_name != "cleaner":
            return jsonify({"error": "Only cleaners can view services."}), 403
        response, status = Service.get_services_by_cleaner(cleaner_id)
        return jsonify({"services": response, "message": "search_services API called"}), status