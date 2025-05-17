from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from server.app.entity.category import Category
from server.app.entity.user import User
from server.app.entity.profile import Profile
from server.app.controller.auth.permission_required import login_required

update_category_blueprint = Blueprint('update_category', __name__)

class UpdateCategoryController:
    @update_category_blueprint.route('/api/category/update/<int:category_id>', methods=['PUT'])
    @jwt_required()
    @login_required
    def update_category(category_id):
        current_user_id = int(get_jwt_identity())
        user = User.query.get(current_user_id)
        if not user:
            return jsonify({"error": "User not found"}), 404
        profile = Profile.query.get(user.profile_id)
        if not profile or profile.has_view_analytics_permission != True:
            return jsonify({"error": "Only users with the 'has_view_listing_analytics' role can update categories."}), 403
        data = request.get_json()
        response, status_code = Category.update_category(category_id, data)
        return jsonify({'success': response, 'message': 'update_category API called'}), status_code