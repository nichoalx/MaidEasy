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
    "logout_blueprint"
]
