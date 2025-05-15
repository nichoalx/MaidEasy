from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from server.app.entity.category import Category
from server.app.entity.user import User
from server.app.entity.profile import Profile
from server.app.controller.auth.permission_required import login_required

update_category_blueprint = Blueprint('update_category', __name__)

class UpdateCategoryController:
    @login_required
    @update_category_blueprint.route('/api/category/update', methods=['PUT'])
    def update_category():
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        if not user:
            return jsonify({"error": "User not found"}), 404
        profile = Profile.query.get(user.profile_id)
        if not profile or profile.has_view_analytics_permission != True:
            return jsonify({"error": "Only users with the 'has_view_listing_analytics' role can update categories."}), 403
        data = request.get_json()
        category_id = data.get('category_id')
        name = data.get('name')
        description = data.get('description')

        response, status_code = Category.update_category(
            category_id=category_id,
            name=name,
            description=description
        )

        return jsonify({'success': response, 'message': 'update_category API called'}), status_code