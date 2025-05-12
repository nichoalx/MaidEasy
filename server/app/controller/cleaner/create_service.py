from flask import Blueprint, request, jsonify
from server.app.entity.cleaner import Cleaner
from server.app.controller.auth.permission_required import login_required

create_listing_blueprint = Blueprint('create_service', __name__)

class CreateServiceController:
    @login_required
    @create_listing_blueprint.route('/api/cleaner/create_service', methods=['POST'])
    def create_service():
        data = request.get_json()

        cleaner_id = data.get('cleaner_id')
        name = data.get('name')
        category = data.get('category')
        description = data.get('description')
        price = data.get('price')

        response, status_code = Cleaner.create_service(
            cleaner_id=cleaner_id,
            name=name,
            category=category,
            description=description,
            price=price
        )
        return jsonify({'success': response, 'message': 'create_service API called'}), status_code
