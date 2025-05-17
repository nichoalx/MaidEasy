from flask import Blueprint, jsonify
from server.app.entity.profile import Profile
from server.app.controller.auth.permission_required import admin_required, login_required

view_profile_blueprint = Blueprint('view_profile', __name__)

class ViewProfileController:
    @admin_required
    @login_required
    @view_profile_blueprint.route('/api/profiles/view/<int:profile_id>', methods=['GET'])
    def view_profile(profile_id):
        response, status_code = Profile.get_profile(profile_id)
        return jsonify({'success': response, 'message': 'view_profile API called'}), status_code
