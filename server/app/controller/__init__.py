# controller/__init__.py

# USER controllers
from server.app.controller.user.create_user import create_user_blueprint
from server.app.controller.user.get_all_users import get_all_users_blueprint
from server.app.controller.user.get_user_by_id import get_user_by_id_blueprint
from server.app.controller.user.update_user import update_user_blueprint
from server.app.controller.user.delete_user import delete_user_blueprint
from server.app.controller.user.search_user import search_user_blueprint
from server.app.controller.user.suspend_user import suspend_user_blueprint

# PROFILE controllers
from server.app.controller.profile.create_profile import create_profile_blueprint
from server.app.controller.profile.update_profile import update_profile_blueprint
from server.app.controller.profile.search_profile import search_profile_blueprint
from server.app.controller.profile.view_profile import view_profile_blueprint
from server.app.controller.profile.suspend_profile import suspend_profile_blueprint


# AUTH controllers
from server.app.controller.auth.login import login_blueprint
from server.app.controller.auth.logout import logout_blueprint

# CLEANER controllers
from server.app.controller.cleaner.create_service import create_listing_blueprint
from server.app.controller.cleaner.delete_listing import delete_listing_blueprint
from server.app.controller.cleaner.search_confirmed_jobs import search_confirmed_jobs_blueprint
from server.app.controller.cleaner.search_my_listings import search_my_listings_blueprint
from server.app.controller.cleaner.update_listing import update_listing_blueprint
from server.app.controller.cleaner.view_confirmed_job_detail import view_confirmed_job_detail_blueprint
from server.app.controller.cleaner.view_listing_shortlists import view_listing_shortlists_blueprint
from server.app.controller.cleaner.view_listing_views import view_listing_views_blueprint
from server.app.controller.cleaner.view_my_listings import view_my_listings_blueprint

# HOMEOWNER controllers
from server.app.controller.homeowner.add_to_shortlist import shortlist_add_blueprint
from server.app.controller.homeowner.search_cleaners import search_cleaner_blueprint
from server.app.controller.homeowner.search_past_bookings import search_bookings_blueprint
from server.app.controller.homeowner.search_shortlist import search_shortlist_blueprint
from server.app.controller.homeowner.view_cleaning_services import view_services_blueprint
from server.app.controller.homeowner.view_past_booking import view_bookings_blueprint
from server.app.controller.homeowner.view_shortlist import view_shortlist_blueprint

# EXPORT all blueprints so they can be imported via: from controller import *
__all__ = [
    # user
    "create_user_blueprint",
    "get_all_users_blueprint",
    "get_user_by_id_blueprint",
    "update_user_blueprint",
    "delete_user_blueprint",
    "search_user_blueprint",
    "suspend_user_blueprint",
    
    # profile
    "create_profile_blueprint",
    "update_profile_blueprint", 
    "search_profile_blueprint",
    "view_profile_blueprint",
    "suspend_profile_blueprint",

    # auth
    "login_blueprint",
    "logout_blueprint",

    # homeowner
    "shortlist_add_blueprint",
    "search_cleaner_blueprint",
    "search_bookings_blueprint",
    "search_shortlist_blueprint",
    "view_services_blueprint",
    "view_bookings_blueprint",
    "view_shortlist_blueprint"
]
