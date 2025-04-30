from flask import Blueprint, jsonify
from server.app.entity.profile import Profile
from server.app.controller.auth.permission_required import admin_required, login_required

suspend_profile_blueprint = Blueprint('suspend_profile', __name__)

class SuspendProfileController:
    @admin_required
    @login_required
    @suspend_profile_blueprint.route('/api/profiles/<int:profile_id>/suspend', methods=['PUT'])
    def suspend_profile(profile_id):
        response, status_code = Profile.suspend_profile(profile_id)
        return jsonify({'success': response, 'message': 'suspend_profile API called'}), status_code
