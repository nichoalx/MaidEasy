from flask import Blueprint, jsonify
from server.app.entity.profile import Profile
from server.app.controller.auth.permission_required import admin_required, login_required

get_all_profiles_blueprint = Blueprint('get_all_profiles', __name__)

class GetAllProfilesController:
    @admin_required
    @login_required
    @get_all_profiles_blueprint.route('/api/profiles', methods=['GET'])
    def get_all_profiles():
        response, status_code = Profile.get_all_profiles()
        return jsonify({'success': response, 'message': 'get_all_profiles API called'}), status_code
