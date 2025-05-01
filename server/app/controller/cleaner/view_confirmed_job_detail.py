from flask import Blueprint, jsonify
from server.app.entity.cleaner import Cleaner
from server.app.controller.auth.permission_required import login_required

view_confirmed_job_detail_blueprint = Blueprint('view_confirmed_job_detail', __name__)

class ViewConfirmedJobDetailController:
    @staticmethod
    @login_required
    @view_confirmed_job_detail_blueprint.route('/api/cleaner/confirmed_job/<int:job_id>', methods=['GET'])
    def view_confirmed_job_detail(job_id):
        response, status_code = Cleaner.get_confirmed_job_detail(job_id)
        return jsonify({'success': response, 'message': 'view_confirmed_job_detail API called'}), status_code
