from flask import current_app
from ..extensions import db
from datetime import datetime, timezone
from typing import Optional, Union

class Profile(db.Model):
    __tablename__ = 'profiles'

    profile_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    role_name = db.Column(db.String(50), unique=True, nullable=False)  
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, nullable=False, default=lambda: datetime.now(timezone.utc))

    has_booking_permission = db.Column(db.Boolean, default=False)
    has_listing_permission = db.Column(db.Boolean, default=False)
    has_view_analytics_permission = db.Column(db.Boolean, default=False)

    def to_dict(self) -> dict:
        return {
            'profile_id': self.profile_id,
            'role_name': self.role_name,
            'description': self.description,
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat(),
            'has_booking_permission': self.has_booking_permission,
            'has_listing_permission': self.has_listing_permission,
            'has_view_analytics_permission': self.has_view_analytics_permission
        }

    @classmethod
    def create_profile(cls, role_name: str, description: Optional[str],
                       has_booking_permission: bool = False,
                       has_listing_permission: bool = False,
                       has_view_analytics_permission: bool = False) -> tuple[dict, int]:

        if cls.query.filter_by(role_name=role_name).one_or_none():
            return {"error": "Profile with this role name already exists"}, 400

        profile = cls(
            role_name=role_name,
            description=description,
            is_active=True,
            has_booking_permission=has_booking_permission,
            has_listing_permission=has_listing_permission,
            has_view_analytics_permission=has_view_analytics_permission
        )

        with current_app.app_context():
            db.session.add(profile)
            db.session.commit()

        return profile.to_dict(), 201

    @classmethod
    def get_profile(cls, profile_id: int) -> tuple[dict, int]:
        profile = cls.query.get(profile_id)
        if not profile:
            return {"error": "Profile not found"}, 404
        return profile.to_dict(), 200

    @classmethod
    def update_profile(cls, profile_id: int, update_data: dict) -> tuple[dict, int]:
        profile = cls.query.get(profile_id)
        if not profile:
            return {"error": "Profile not found"}, 404

        if update_data.get('role_name'):
            if cls.query.filter_by(role_name=update_data['role_name']).one_or_none():
                return {"error": "Profile with this role name already exists"}, 400
            profile.role_name = update_data['role_name']
        if update_data.get('description'):
            profile.description = update_data['description']
        if 'has_booking_permission' in update_data:
            profile.has_booking_permission = update_data['has_booking_permission']
        if 'has_listing_permission' in update_data:
            profile.has_listing_permission = update_data['has_listing_permission']
        if 'has_view_analytics_permission' in update_data:
            profile.has_view_analytics_permission = update_data['has_view_analytics_permission']

        db.session.commit()
        return profile.to_dict(), 200

    @classmethod
    def suspend_profile(cls, profile_id: int) -> tuple[dict, int]:
        profile = cls.query.get(profile_id)
        if not profile:
            return {"error": "Profile not found"}, 404

        try:
            if not profile.is_active:
                return {"error": "Profile is already suspended"}, 400

            profile.is_active = False
            db.session.commit()
            return {"message": "Profile suspended successfully"}, 200

        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}, 500

    @classmethod
    def search_profiles(cls, role_name: Optional[str] = None) -> tuple[list[dict], int]:
        query = cls.query
        if role_name:
            query = query.filter(cls.role_name == role_name)
        return [p.to_dict() for p in query.all()], 200

    @classmethod
    def get_all_profiles(cls) -> tuple[list[dict], int]:
        return [p.to_dict() for p in cls.query.all()], 200
