from flask import Flask
from .config import config_by_name
from .extensions import db, jwt, cors
from .views import user_admin_routes

def create_app(config_name="development"):
    app = Flask(__name__)
    app.config.from_object(config_by_name[config_name])
    
    # Initialize extensions
    db.init_app(app)
    jwt.init_app(app)
    cors.init_app(app)
    
    # Create database tables
    with app.app_context():
        db.create_all()
    
    # Register blueprints
    app.register_blueprint(user_admin_routes)
    
    return app