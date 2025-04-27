from flask import Blueprint, jsonify
from server.app.entity.cleaner import Cleaner
from server.app.controller.auth.permission_required import login_required

view_listing_views_blueprint = Blueprint('view_listing_views', __name__)

class ViewListingViewsController:
    @login_required
    @view_listing_views_blueprint.route('/api/cleaner/listing_views/<int:listing_id>', methods=['GET'])
    def view_listing_views(listing_id):
        response, status_code = Cleaner.get_listing_views(listing_id)
        return jsonify({'success': response, 'message': 'view_listing_views API called'}), status_code
