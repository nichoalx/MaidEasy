from flask import Blueprint, request, jsonify, session
from server.app.entity.homeowner import HomeOwner

add_to_shortlist_blueprint = Blueprint('add_to_shortlist', __name__)

class AddToShortlistController:
    @add_to_shortlist_blueprint.route('/api/homeowner/add_to_shortlist', methods=['POST'])
    def add_to_shortlist():
        data = request.get_json()
        cleaner_id = data.get('cleaner_id')
        
        if 'homeowner_id' not in session:
            return jsonify({"error": "Homeowner not logged in"}), 401
        
        homeowner_id = session['homeowner_id']
        success, message = HomeOwner.add_cleaner_to_shortlist(homeowner_id, cleaner_id)
        
        if success:
            return jsonify({'message': message}), 200
        else:
            return jsonify({'error': message}), 400
