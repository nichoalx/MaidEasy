from flask import Flask
from server.app.admin import seed_admin
from server.app.config import config_by_name
from server.app.extensions import db, jwt, cors

# Blueprints
from server.app.controller import (
    # User
    create_user_blueprint,
    get_all_users_blueprint,
    get_user_by_id_blueprint,
    update_user_blueprint,
    delete_user_blueprint,
    search_user_blueprint,
    suspend_user_blueprint,
    activate_user_blueprint,

    # Profile
    create_profile_blueprint,
    update_profile_blueprint,
    search_profile_blueprint,
    view_profile_blueprint,
    suspend_profile_blueprint,
    activate_profile_blueprint,
    get_all_profiles_blueprint,

    # Auth
    login_blueprint,
    logout_blueprint,

    # Homeowner
    add_to_shortlist_blueprint,
    delete_from_shortlist_blueprint,
    search_shortlist_blueprint,
    view_shortlist_blueprint,
    create_booking_blueprint,
    search_service_blueprint,
    view_past_bookings_blueprint,
    view_services_blueprint,
    view_booking_details_blueprint,
    
    # Cleaner
    create_service_blueprint,
    update_service_blueprint,
    delete_service_blueprint,
    search_my_service_blueprint,
    view_service_blueprint,
    view_job_history_blueprint,
    view_job_details_blueprint,

    # Platform Manager
    create_category_blueprint,
    update_category_blueprint,
    delete_category_blueprint,
    view_categories_blueprint,
    view_all_categories_blueprint,
    report_blueprint

)

def create_app(config_name="development"):
    app = Flask(__name__)
    app.config.from_object(config_by_name[config_name])

    # Initialize extensions
    db.init_app(app)
    jwt.init_app(app)
    cors.init_app(app)

    # Register Blueprints
    # User
    app.register_blueprint(create_user_blueprint)
    app.register_blueprint(get_all_users_blueprint)
    app.register_blueprint(get_user_by_id_blueprint)
    app.register_blueprint(update_user_blueprint)
    app.register_blueprint(delete_user_blueprint)
    app.register_blueprint(search_user_blueprint)
    app.register_blueprint(suspend_user_blueprint)
    app.register_blueprint(activate_user_blueprint)

    # Profile
    app.register_blueprint(create_profile_blueprint)
    app.register_blueprint(update_profile_blueprint)
    app.register_blueprint(search_profile_blueprint)
    app.register_blueprint(view_profile_blueprint)
    app.register_blueprint(suspend_profile_blueprint)
    app.register_blueprint(activate_profile_blueprint)
    app.register_blueprint(get_all_profiles_blueprint)

    # Auth
    app.register_blueprint(login_blueprint)
    app.register_blueprint(logout_blueprint)

    # Homeowner
    app.register_blueprint(add_to_shortlist_blueprint)
    app.register_blueprint(delete_from_shortlist_blueprint)
    app.register_blueprint(search_shortlist_blueprint)
    app.register_blueprint(view_shortlist_blueprint)
    app.register_blueprint(create_booking_blueprint)
    app.register_blueprint(view_past_bookings_blueprint)
    app.register_blueprint(search_service_blueprint)
    app.register_blueprint(view_services_blueprint)
    app.register_blueprint(view_booking_details_blueprint)

    # Cleaner
    app.register_blueprint(create_service_blueprint)
    app.register_blueprint(update_service_blueprint)
    app.register_blueprint(delete_service_blueprint)
    app.register_blueprint(view_service_blueprint)
    app.register_blueprint(search_my_service_blueprint)
    app.register_blueprint(view_job_history_blueprint)
    app.register_blueprint(view_job_details_blueprint)

    # Platform Manager
    app.register_blueprint(create_category_blueprint)
    app.register_blueprint(update_category_blueprint)
    app.register_blueprint(delete_category_blueprint)
    app.register_blueprint(view_categories_blueprint)
    app.register_blueprint(view_all_categories_blueprint)
    app.register_blueprint(report_blueprint)

    # Create database tables
    with app.app_context():
        db.create_all()
        seed_admin()

    return app
