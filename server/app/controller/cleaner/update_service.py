from flask import Blueprint, request, jsonify
from server.app.entity.service import Service
from server.app.entity.user import User
from server.app.entity.profile import Profile
from flask_jwt_extended import get_jwt_identity, jwt_required
from server.app.controller.auth.permission_required import login_required

update_service_blueprint = Blueprint('update_service', __name__)

class UpdateServiceController:
    @update_service_blueprint.route('/api/cleaner/update/<int:service_id>', methods=['PUT'])
    @jwt_required()
    @login_required
    def update_service(service_id):
        current_user_id = int(get_jwt_identity())
        user = User.query.get(current_user_id)
        profile = Profile.query.get(user.profile_id)

        if profile.role_name != "cleaner":
            return jsonify({"error": "Only cleaners can update services."}), 403

        data = request.get_json()
        
        response, status = Service.update_service(service_id, data)
        return jsonify({"success": response, "message": "update_service API called"}), status
