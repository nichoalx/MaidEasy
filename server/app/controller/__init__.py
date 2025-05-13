# CENTRALIZED IMPORTS, WHY? WHY NOT.

# USER controllers
from .user.create_user import create_user_blueprint
from .user.get_all_users import get_all_users_blueprint
from .user.get_user_by_id import get_user_by_id_blueprint
from .user.update_user import update_user_blueprint
from .user.delete_user import delete_user_blueprint
from .user.search_user import search_user_blueprint
from .user.suspend_user import suspend_user_blueprint

# PROFILE controllers
from .profile.create_profile import create_profile_blueprint
from .profile.update_profile import update_profile_blueprint
from .profile.search_profile import search_profile_blueprint
from .profile.view_profile import view_profile_blueprint
from .profile.suspend_profile import suspend_profile_blueprint


# AUTH controllers
from .auth.login import login_blueprint
from .auth.logout import logout_blueprint

# HOMEOWNER controllers
from .homeowner.shortlist.add_to_shortlist import add_to_shortlist_blueprint
from .homeowner.shortlist.delete_from_shortlist import delete_from_shortlist_blueprint
from .homeowner.shortlist.search_shortlist import search_shortlist_blueprint
from .homeowner.shortlist.view_shortlist import view_shortlist_blueprint
from .homeowner.create_booking import create_booking_blueprint
from .homeowner.search_services import search_service_blueprint
from .homeowner.view_past_bookings import view_past_bookings_blueprint
from .homeowner.view_services import view_services_blueprint

# CLEANER controllers

# PLATFORM MANAGER controllers

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
    "add_to_shortlist_blueprint",
    "delete_from_shortlist_blueprint",
    "create_booking_blueprint",
    "search_service_blueprint",
    "search_shortlist_blueprint",
    "view_services_blueprint",
    "view_past_bookings_blueprint",
    "view_shortlist_blueprint"
]
