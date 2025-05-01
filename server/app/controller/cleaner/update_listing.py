from flask import Blueprint, request, jsonify
from server.app.entity.cleaner import Cleaner
from server.app.controller.auth.permission_required import login_required

update_listing_blueprint = Blueprint('update_listing', __name__)

class UpdateListingController:
    @staticmethod
    @login_required
    @update_listing_blueprint.route('/api/cleaner/update_listing/<int:listing_id>', methods=['PUT'])
    def update_listing(listing_id):
        data = request.get_json()
        response, status_code = Cleaner.update_listing(listing_id, data)
        return jsonify({'success': response, 'message': 'update_listing API called'}), status_code
