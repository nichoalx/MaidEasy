from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from server.app.entity.category import Category
from server.app.entity.user import User
from server.app.entity.profile import Profile
from server.app.controller.auth.permission_required import login_required

view_categories_blueprint = Blueprint('search_categories', __name__)

class ViewCategoriesController:
    @view_categories_blueprint.route('/api/category/view/<int:category_id>', methods=['GET'])
    @jwt_required()
    @login_required
    def view_categories(category_id):
        current_user_id = int(get_jwt_identity())
        user = User.query.get(current_user_id)
        if not user:
            return jsonify({"error": "User not found"}), 404
        profile = Profile.query.get(user.profile_id)
        response, status_code = Category.get_category_by_id(category_id)
        return jsonify({'success': response, 'message': 'view_categories API called'}), status_code