from flask import Blueprint, request, jsonify
from server.app.entity.cleaner import Cleaner
from server.app.controller.auth.permission_required import login_required

create_listing_blueprint = Blueprint('create_listing', __name__)

class CreateListingController:
    @login_required
    @create_listing_blueprint.route('/api/cleaner/create_listing', methods=['POST'])
    def create_listing():
        data = request.get_json()

        response, status_code = Cleaner.create_listing(data)
        return jsonify({'success': response, 'message': 'create_listing API called'}), status_code
