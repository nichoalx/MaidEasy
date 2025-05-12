from flask import Blueprint, jsonify
from server.app.entity.cleaner import Cleaner
from server.app.controller.auth.permission_required import login_required

delete_listing_blueprint = Blueprint('delete_service', __name__)

class DeleteListingController:
    @login_required
    @delete_listing_blueprint.route('/api/cleaner/delete_service/<int:listing_id>', methods=['DELETE'])
    def delete_listing(listing_id):
        response, status_code = Cleaner.delete_service(listing_id)
        return jsonify({'success': response, 'message': 'delete_service API called'}), status_code
