from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from server.app.entity.category import Category
from server.app.entity.user import User
from server.app.entity.profile import Profile
from server.app.controller.auth.permission_required import login_required

search_categories_blueprint = Blueprint('search_categories', __name__)

class SearchCategoriesController:
    @search_categories_blueprint.route('/api/category/search/<string:category_name>', methods=['GET'])
    @jwt_required()
    @login_required
    def search_categories(category_name):
        current_user_id = int(get_jwt_identity())
        user = User.query.get(current_user_id)
        if not user:
            return jsonify({"error": "User not found"}), 404
        profile = Profile.query.get(user.profile_id)
        if not profile or profile.has_view_analytics_permission != True:
            return jsonify({"error": "Only users with the 'has_view_listing_analytics' role can search categories."}), 403
        response, status_code = Category.search_categories(category_name=category_name)
        return jsonify({'success': response, 'message': 'search_categories API called'}), status_code