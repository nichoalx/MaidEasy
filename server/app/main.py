import sys
import os
sys.path.append(os.path.abspath(os.path.dirname(__file__)))
from app import create_app
from app.views import user_admin_routes

app = create_app()
app.register_blueprint(user_admin_routes)

@app.route("/")
def home():
    return "API is running!"


if __name__ == "__main__":
    home()
    # Run the Flask app
    app.run(debug=True)  # Enable debug mode for testing