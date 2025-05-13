from flask import Blueprint, request, jsonify
from server.app.entity import Profile
from server.app.controller.auth.permission_required import admin_required, login_required

create_profile_blueprint = Blueprint('create_profile', __name__)

class CreateProfileController:
    @admin_required
    @login_required
    @create_profile_blueprint.route('/api/profile/create', methods=['POST'])
    def create_profile():
        data = request.get_json()

        name = data.get('name')
        description = data.get('description')
        is_active = data.get('is_active', True)
        has_booking_permission = data.get('has_booking_permission', False)
        has_listing_permission = data.get('has_listing_permission', False)
        has_view_analytics_permission = data.get('has_view_analytics_permission', False)
        # created at is handled automatically in the entity for anyone reading this code
        
        response, status_code = Profile.create_profile(
            name=name,
            description=description,
            is_active=is_active,
            has_booking_permission=has_booking_permission,
            has_listing_permission=has_listing_permission,
            has_view_analytics_permission=has_view_analytics_permission
        )

        return jsonify({'success': response, 'message': 'create_profile API called'}), status_code
