# seed_admin.py
import os
from datetime import datetime
from flask import current_app
from .extensions import db
from server.app.entity.user import User
from server.app.entity.profile import Profile


def seed_admin():
    email = os.getenv("INIT_ADMIN_EMAIL")
    password = os.getenv("INIT_ADMIN_PASSWORD")
    first_name = os.getenv("INIT_ADMIN_FIRST_NAME", "Admin")
    last_name = os.getenv("INIT_ADMIN_LAST_NAME", "User")
    dob = os.getenv("INIT_ADMIN_DOB", "1990-01-01")
    contact_number = os.getenv("INIT_ADMIN_CONTACT", "00000000")
    type_of_user = "admin"

    existing_user = User.query.filter_by(email=email).one_or_none()
    if existing_user:
        print("Admin already exists.")
        return

    # Ensure the profile exists
    profile = Profile.query.filter_by(name=type_of_user).one_or_none()
    if not profile:
        profile = Profile(name=type_of_user, description="Super Admin")
        db.session.add(profile)
        db.session.commit()

    user_dict, status = User.create_user(
        first_name=first_name,
        last_name=last_name,
        email=email,
        password=password,
        dob=dob,
        contact_number=contact_number,
        type_of_user=type_of_user,
        profile_id=profile.profile_id
    )

    if status == 201:
        print("Admin seeded successfully:", user_dict)
    else:
        print("Error creating admin:", user_dict)
