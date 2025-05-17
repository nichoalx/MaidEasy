from flask import Blueprint, request, jsonify
from server.app.entity.profile import Profile
from server.app.controller.auth.permission_required import admin_required, login_required

search_profile_blueprint = Blueprint('search_profile', __name__)

class SearchProfileController:
    @admin_required
    @login_required
    @search_profile_blueprint.route('/api/profiles/search', methods=['GET'])
    def search_profiles():
        data = request.get_json()
        role_name = data.get('role_name')
        response, status_code = Profile.search_profiles(role_name)
        return jsonify({'success': response, 'message': 'search_profiles API called'}), status_code
