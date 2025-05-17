import os
import sys
sys.path.append(os.path.abspath(os.path.dirname(__file__)))
from __init__ import create_app

app = create_app()

@app.route("/")
def home():
    return "API is running!"

if __name__ == "__main__":
    app.run(debug=True) # Run the Flask app
