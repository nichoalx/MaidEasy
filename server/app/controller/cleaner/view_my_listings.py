from flask import Blueprint, jsonify, session
from server.app.entity.cleaner import Cleaner
from server.app.controller.auth.permission_required import login_required

view_my_listings_blueprint = Blueprint('view_my_listings', __name__)

class ViewMyListingsController:
    @staticmethod
    @login_required
    @view_my_listings_blueprint.route('/api/cleaner/my_listings', methods=['GET'])
    def view_my_listings():
        email = session.get('email')
        response, status_code = Cleaner.get_my_listings(email)
        return jsonify({'success': response, 'message': 'view_my_listings API called'}), status_code
