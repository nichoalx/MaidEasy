from flask import Blueprint, request, jsonify
from server.app.entity.profile import Profile
from server.app.controller.auth.permission_required import admin_required, login_required

search_profile_blueprint = Blueprint('search_profile', __name__)

class SearchProfileController:
    @admin_required
    @login_required
    @search_profile_blueprint.route('/api/profiles/search', methods=['GET'])
    def search_profiles():
        name = request.args.get('name')
        description = request.args.get('description')
        is_active = request.args.get('is_active')
        
        response, status_code = Profile.search_profiles(
            name = name,
            description = description,
            is_active = is_active
        )

        return jsonify({'success': response, 'message': 'search_profiles API called'}), 200
