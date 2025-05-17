import os
import sys
sys.path.append(os.path.abspath(os.path.dirname(__file__)))
from __init__ import create_app
from .extensions import cors

app = create_app()
# Initialize CORS
cors.init_app(app, origins=["http://localhost:5173"], supports_credentials=True)

@app.route("/")
def home():
    return "API is running!"

if __name__ == "__main__":
    app.run(debug=True) # Run the Flask app
