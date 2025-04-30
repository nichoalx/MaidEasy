from flask import Blueprint, request, jsonify
from server.app.entity.profile import Profile
from server.app.controller.auth.permission_required import admin_required, login_required

update_profile_blueprint = Blueprint('update_profile', __name__)

class UpdateProfileController:
    @admin_required
    @login_required
    @update_profile_blueprint.route('/api/profiles/<int:profile_id>', methods=['PUT'])
    def update_profile(profile_id):
        data = request.get_json()
        response, status_code = Profile.update_profile(profile_id, data)
        return jsonify({'success': response, 'message': 'update_profile API called'}), status_code
