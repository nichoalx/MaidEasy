from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from server.app.entity.user import User
from server.app.entity.profile import Profile
from server.app.entity.service import Service
from server.app.controller.auth.permission_required import login_required

create_service_blueprint = Blueprint('create_service', __name__)

class CreateServiceController:
    @create_service_blueprint.route('/api/cleaner/create', methods=['POST'])
    @jwt_required()
    @login_required
    def create_service():
        current_user_id = int(get_jwt_identity())
        user = User.query.get(current_user_id)
        if not user:
            return jsonify({"error": "User not found"}), 404

        profile = Profile.query.get(user.profile_id)
        if not profile or profile.role_name != "cleaner":
            return jsonify({"error": "Only users with the 'cleaner' role can create services."}), 403

        data = request.get_json()
        name = data.get("name")
        category_name = data.get("category_name")
        description = data.get("description")
        price = data.get("price")
        duration = data.get("duration")
        availability = data.get("availability")

        response, status = Service.create_service(
            cleaner_id=current_user_id,
            name=name,
            category_name=category_name,
            description=description,
            price=price,
            duration=duration,
            availability=availability
        )

        return jsonify({"success": response, "message": "create_service API called"}), status
