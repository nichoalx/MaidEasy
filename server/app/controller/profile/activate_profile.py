from flask import Blueprint, request, jsonify
from server.app.entity.profile import Profile
from server.app.controller.auth.permission_required import admin_required, login_required

activate_profile_blueprint = Blueprint('activate_profile', __name__)

class ActivateProfileController:
    @admin_required
    @login_required
    @activate_profile_blueprint.route('/api/profiles/activate/<int:profile_id>', methods=['PUT'])
    def activate_profile(profile_id):
        response, status_code = Profile.activate_profile(profile_id)
        return jsonify({'success': response, 'message': 'activate_profile API called'}), status_code