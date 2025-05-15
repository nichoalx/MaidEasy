from flask import Blueprint, request, jsonify
from server.app.entity.service import Service
from server.app.entity.user import User
from server.app.entity.profile import Profile
from flask_jwt_extended import get_jwt_identity, jwt_required
from server.app.controller.auth.permission_required import login_required

delete_service_blueprint = Blueprint('delete_service', __name__)

class DeleteServiceController:
    @delete_service_blueprint.route('/api/cleaner/delete/<int:service_id>', methods=['DELETE'])
    @jwt_required()
    @login_required
    def delete_service(service_id):
        current_user_id = int(get_jwt_identity())
        user = User.query.get(current_user_id)
        profile = Profile.query.get(user.profile_id)

        if profile.role_name != "cleaner":
            return jsonify({"error": "Only cleaners can delete services."}), 403

        response, status = Service.delete_service(service_id)
        return jsonify({"success": response, "message": "delete_service API called"}), status