from flask import Blueprint, request, jsonify, session
from server.app.entity.cleaner import Cleaner
from server.app.controller.auth.permission_required import login_required

search_my_listings_blueprint = Blueprint('search_my_listings', __name__)

class SearchMyListingsController:
    @login_required
    @search_my_listings_blueprint.route('/api/cleaner/search_my_listings', methods=['GET'])
    def search_my_listings():
        name = request.args.get('name')
        category = request.args.get('category')
        email = session.get('email')

        response = Cleaner.search_my_listings(email=email, name=name, category=category)
        return jsonify({'success': response, 'message': 'search_my_listings API called'}), 200
