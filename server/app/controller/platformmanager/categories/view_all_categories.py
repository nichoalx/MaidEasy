from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from server.app.entity.category import Category
from server.app.entity.user import User
from server.app.entity.profile import Profile
from server.app.controller.auth.permission_required import login_required

view_all_categories_blueprint = Blueprint('view_all_categories', __name__)
class ViewAllCategoriesController:
    @view_all_categories_blueprint.route('/api/category/view_all', methods=['GET'])
    @jwt_required()
    @login_required
    def view_all_categories():
        current_user_id = int(get_jwt_identity())
        user = User.query.get(current_user_id)
        if not user:
            return jsonify({"error": "User not found"}), 404
        profile = Profile.query.get(user.profile_id)
        if not profile or profile.has_view_analytics_permission != True:
            return jsonify({"error": "Only users with the 'has_view_listing_analytics' role can view all categories."}), 403

        response, status_code = Category.get_all_categories()

        return jsonify({'success': response, 'message': 'view_all_categories API called'}), status_code
