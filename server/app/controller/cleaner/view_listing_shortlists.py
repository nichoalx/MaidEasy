from flask import Blueprint, jsonify
from server.app.entity.cleaner import Cleaner
from server.app.controller.auth.permission_required import login_required

view_listing_shortlists_blueprint = Blueprint('view_listing_shortlists', __name__)

class ViewListingShortlistsController:
    @staticmethod
    @login_required
    @view_listing_shortlists_blueprint.route('/api/cleaner/listing_shortlists/<int:listing_id>', methods=['GET'])
    def view_listing_shortlists(listing_id):
        response, status_code = Cleaner.get_listing_shortlists(listing_id)
        return jsonify({'success': response, 'message': 'view_listing_shortlists API called'}), status_code
