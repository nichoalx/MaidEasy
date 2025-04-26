import os
import sys
sys.path.append(os.path.abspath(os.path.dirname(__file__)))
from app import create_app

app = create_app()

@app.route("/")
def home():
    return "API is running!"

if __name__ == "__main__":
    app.run(debug=True) # Run the Flask app

# from server.app.controller.user.create_user_controller import create_user_blueprint
# from server.app.controller.user.get_all_users_controller import get_all_users_blueprint
# from server.app.controller.user.get_user_by_id_controller import get_user_by_id_blueprint
# from server.app.controller.user.update_user_controller import update_user_blueprint
# from server.app.controller.user.delete_user_controller import delete_user_blueprint
# from server.app.controller.user.search_user_controller import search_user_blueprint

# app.register_blueprint(create_user_blueprint)
# app.register_blueprint(get_all_users_blueprint)
# app.register_blueprint(get_user_by_id_blueprint)
# app.register_blueprint(update_user_blueprint)
# app.register_blueprint(delete_user_blueprint)
# app.register_blueprint(search_user_blueprint)
