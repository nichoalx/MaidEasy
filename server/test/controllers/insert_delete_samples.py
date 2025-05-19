import json
import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../../../')))
from server.app import create_app
from server.app.extensions import db
from server.app.entity.profile import Profile
from server.app.entity.user import User

app = create_app()

def load_json(file_path):
    base_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
    with open(os.path.join(base_path, file_path), "r") as f:
        return json.load(f)

def insert_profiles(profiles):
    for idx, p in enumerate(profiles, 1):
        res, status = Profile.create_profile(
            role_name=p["role_name"],
            has_booking_permission=p["has_booking_permission"],
            has_listing_permission=p["has_listing_permission"],
            has_view_analytics_permission=p["has_view_analytics_permission"]
        )
        print(f"Inserting profile {idx} ({p['role_name']})... {'success' if status == 201 else f'failed - {res.get('error')}'}")

def insert_users(users):
    for idx, u in enumerate(users, 1):
        res, status = User.create_user(
            first_name=u["first_name"],
            last_name=u["last_name"],
            email=u["email"],
            password=u["password"],
            dob=u["dob"],
            contact_number=u["contact_number"],
            role_name=u["role_name"]
        )
        print(f"Inserting user {idx} ({u['email']})... {'success' if status == 201 else f'failed - {res.get('error')}'}")

def delete_samples():
    User.query.delete()
    Profile.query.delete()
    db.session.commit()
    print("Deleted all sample users and profiles.")

def run():
    with app.app_context():
        db.drop_all()
        db.create_all()

        print("Inserting test data...")
        profiles = load_json("PROFILES_SAMPLE.json")
        users = load_json("USERS_SAMPLE.json")

        insert_profiles(profiles)
        insert_users(users)

        print("\nCleaning up test data...")
        delete_samples()

if __name__ == "__main__":
    run()
