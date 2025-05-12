from flask import Flask
from .admin import seed_admin
from .config import config_by_name
from .extensions import db, jwt, cors

# Blueprints
from .controller import (
    create_user_blueprint,
    get_all_users_blueprint,
    get_user_by_id_blueprint,
    update_user_blueprint,
    delete_user_blueprint,
    search_user_blueprint,
    suspend_user_blueprint,
    create_profile_blueprint,
    update_profile_blueprint,
    search_profile_blueprint,
    view_profile_blueprint,
    suspend_profile_blueprint,
    login_blueprint,
    logout_blueprint,
    shortlist_add_blueprint,
    search_cleaner_blueprint,
    search_bookings_blueprint,
    search_shortlist_blueprint,
    view_services_blueprint,
    view_bookings_blueprint,
    view_shortlist_blueprint,
    create_listing_blueprint,
    delete_listing_blueprint,
    search_confirmed_jobs_blueprint,
    search_my_listings_blueprint,
    update_listing_blueprint,
    view_confirmed_job_detail_blueprint,
    view_listing_shortlists_blueprint,
    view_listing_views_blueprint,
    view_my_listings_blueprint,
)

def create_app(config_name="development"):
    app = Flask(__name__)
    app.config.from_object(config_by_name[config_name])

    # Initialize extensions
    db.init_app(app)
    jwt.init_app(app)
    cors.init_app(app)

    # Register all user-related blueprints
    app.register_blueprint(create_user_blueprint)
    app.register_blueprint(get_all_users_blueprint)
    app.register_blueprint(get_user_by_id_blueprint)
    app.register_blueprint(update_user_blueprint)
    app.register_blueprint(delete_user_blueprint)
    app.register_blueprint(search_user_blueprint)
    app.register_blueprint(suspend_user_blueprint)

    # Register all profile-related blueprints
    app.register_blueprint(create_profile_blueprint)
    app.register_blueprint(update_profile_blueprint)
    app.register_blueprint(search_profile_blueprint)
    app.register_blueprint(view_profile_blueprint)
    app.register_blueprint(suspend_profile_blueprint)

    # Register auth-related blueprints
    app.register_blueprint(login_blueprint)
    app.register_blueprint(logout_blueprint)

    # Register cleaner-related blueprints
    app.register_blueprint(create_listing_blueprint)
    app.register_blueprint(delete_listing_blueprint)
    app.register_blueprint(search_confirmed_jobs_blueprint)
    app.register_blueprint(search_my_listings_blueprint)
    app.register_blueprint(update_listing_blueprint)
    app.register_blueprint(view_confirmed_job_detail_blueprint)   
    app.register_blueprint(view_listing_shortlists_blueprint)     
    app.register_blueprint(view_listing_views_blueprint)
    app.register_blueprint(view_my_listings_blueprint)


    # Register homeowner-related blueprints
    app.register_blueprint(shortlist_add_blueprint)
    app.register_blueprint(search_cleaner_blueprint)
    app.register_blueprint(search_bookings_blueprint)
    app.register_blueprint(search_shortlist_blueprint)
    app.register_blueprint(view_services_blueprint)
    app.register_blueprint(view_bookings_blueprint)
    app.register_blueprint(view_shortlist_blueprint)

    # Create database tables
    with app.app_context():
        db.create_all()
        seed_admin()()

    return app
