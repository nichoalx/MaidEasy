from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from server.app.entity.category import Category
from server.app.entity.user import User
from server.app.entity.profile import Profile
from server.app.controller.auth.permission_required import login_required

delete_category_blueprint = Blueprint('delete_category', __name__)

class DeleteCategoryController:
    @delete_category_blueprint.route('/api/category/delete/<int:category_id>', methods=['DELETE'])
    @jwt_required()
    @login_required
    def delete_category(category_id):
        current_user_id = int(get_jwt_identity())
        user = User.query.get(current_user_id)
        if not user:
            return jsonify({"error": "User not found"}), 404
        profile = Profile.query.get(user.profile_id)
        if not profile or profile.has_view_analytics_permission != True:
            return jsonify({"error": "Only users with the 'has_view_listing_analytics' role can delete categories."}), 403
        data = request.get_json()
        category_id = data.get('category_id')

        response, status_code = Category.delete_category(
            category_id=category_id
        )

        return jsonify({'success': response, 'message': 'delete_category API called'}), status_code
   