from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from server.app.entity.category import Category
from server.app.entity.user import User
from server.app.entity.profile import Profile
from server.app.controller.auth.permission_required import login_required

create_category_blueprint = Blueprint('create_category', __name__)

class CreateCategoryController:
    @login_required
    @create_category_blueprint.route('/api/category/create', methods=['POST'])
    def create_category():
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        if not user:
            return jsonify({"error": "User not found"}), 404
        profile = Profile.query.get(user.profile_id)
        if not profile or profile.has_view_analytics_permission != True:
            return jsonify({"error": "Only users with the 'has_view_listing_analytics' role can create categories."}), 403
        data = request.get_json()
        name = data.get('name')
        description = data.get('description')

        response, status_code = Category.create_category(
            name=name,
            description=description
        )

        return jsonify({'success': response, 'message': 'create_category API called'}), status_code