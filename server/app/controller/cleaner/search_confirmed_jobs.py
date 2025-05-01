from flask import Blueprint, request, jsonify, session
from server.app.entity.cleaner import Cleaner
from server.app.controller.auth.permission_required import login_required

search_confirmed_jobs_blueprint = Blueprint('search_confirmed_jobs', __name__)

class SearchConfirmedJobsController:
    @staticmethod
    @login_required
    @search_confirmed_jobs_blueprint.route('/api/cleaner/confirmed_jobs', methods=['GET'])
    def search_confirmed_jobs():
        service_type = request.args.get('service_type')
        date = request.args.get('date')
        email = session.get('email')

        response = Cleaner.search_confirmed_jobs(email=email, service_type=service_type, date=date)
        return jsonify({'success': response, 'message': 'search_confirmed_jobs API called'}), 200
