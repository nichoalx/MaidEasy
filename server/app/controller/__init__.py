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
    "shortlist_add_blueprint",
    "search_cleaner_blueprint",
    "search_bookings_blueprint",
    "search_shortlist_blueprint",
    "view_services_blueprint",
    "view_bookings_blueprint",
    "view_shortlist_blueprint"
]
