from flask import Blueprint, request, jsonify
from server.app.entity.service import Service
from server.app.controller.auth.permission_required import login_required

search_service_blueprint = Blueprint('search_service', __name__)

class SearchServiceController:
    @login_required
    @search_service_blueprint.route('/api/homeowner/search_services', methods=['GET'])
    def search_services():
        name = request.args.get('name')
        category = request.args.get('category')

        response, status = Service.search_services(name=name, category=category)
        return jsonify(response), status