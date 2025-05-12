from flask import Blueprint, request, jsonify
from server.app.entity.service import Service
from server.app.controller.auth.permission_required import login_required

search_service_blueprint = Blueprint('search_service', __name__)

class SearchServiceController:
    @login_required
    @search_service_blueprint.route('/api/cleaner/search_service', methods=['GET'])
    def search_service():
        cleaner_id = request.args.get('cleaner_id')
        name = request.args.get('name')
        category = request.args.get('category')
        response, status = Service.search_services_by_cleaner(cleaner_id, name, category)
        return jsonify({"services": response, "message": "search_services API called"}), status