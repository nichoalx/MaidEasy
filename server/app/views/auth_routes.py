from flask import Blueprint
from app.controllers.auth_controller import AuthController
from flask_jwt_extended import jwt_required

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')
auth_controller = AuthController()

@auth_bp.route('/login', methods=['POST'])
def login():
    return auth_controller.login()

@auth_bp.route('/verify', methods=['GET'])
@jwt_required()
def verify_token():
    return auth_controller.verify_token()

@auth_bp.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    return auth_controller.logout()