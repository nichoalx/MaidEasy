from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from server.app.entity.category import Category
from server.app.entity.user import User
from server.app.entity.profile import Profile
from server.app.controller.auth.permission_required import login_required

search_categories_blueprint = Blueprint('search_categories', __name__)

class SearchCategoriesController:
    @login_required
    @search_categories_blueprint.route('/api/category/search', methods=['GET'])
    def search_categories():
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        if not user:
            return jsonify({"error": "User not found"}), 404
        profile = Profile.query.get(user.profile_id)
        if not profile or profile.has_view_analytics_permission != True:
            return jsonify({"error": "Only users with the 'has_view_listing_analytics' role can search categories."}), 403

        data = request.get_json()
        name = data.get('name')

        response, status_code = Category.search_categories(
            name=name
        )

        return jsonify({'success': response, 'message': 'search_categories API called'}), status_code