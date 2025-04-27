from flask import Blueprint, request, jsonify
from server.app.entity.cleaner import Cleaner

search_cleaners_blueprint = Blueprint('search_cleaners', __name__)

class SearchCleanersController:
    @search_cleaners_blueprint.route('/api/homeowner/search_cleaners', methods=['GET'])
    def search_cleaners():
        rating = request.args.get('rating')
        price = request.args.get('price')
        availability = request.args.get('availability')
        
        cleaners = Cleaner.search_cleaners(rating=rating, price=price, availability=availability)  # Search function
        return jsonify({'cleaners': cleaners, 'message': 'Cleaners search result retrieved successfully'}), 200
