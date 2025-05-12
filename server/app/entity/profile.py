from flask import current_app
from server.app.extensions import db
from datetime import datetime
from typing import Optional, Union

class Profile(db.Model):
    __tablename__ = 'profiles'

    profile_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    description = db.Column(db.String(255), nullable=True)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.now)

    def to_dict(self) -> dict:
        return {
            'profile_id': self.profile_id,
            'name': self.name,
            'description': self.description,
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat()
        }

    @classmethod
    def create_profile( cls, name: str, description: Optional[str], 
                        is_active: bool, created_at: str) -> tuple[dict, int]:

        if cls.query.filter_by(name=name).one_or_none():
            return {"error": "Profile with this name already exists"}, 400

        try:
            created_at_date = datetime.strptime(created_at, '%Y-%m-%d %H:%M:%S')
        except ValueError:
            return {"error": "Invalid date format. Use YYYY-MM-DD HH:MM:SS."}, 400

        profile = cls(
            name=name,
            description=description,
            is_active=is_active,
            created_at=created_at_date
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

        if update_data.get('name'):
            if cls.query.filter_by(name=update_data['name']).one():
                return {"error": "Profile with this name already exists"}, 400
            profile.name = update_data['name']
        if update_data.get('description'):
            profile.description = update_data['description']

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
    def search_profiles(cls, name: Optional[str] = None) -> tuple[list[dict], int]:
        if name:
            query = query.filter(cls.name == name)

        return [p.to_dict() for p in cls.query.all], 200

    @classmethod
    def get_all_profiles(cls) -> tuple[list[dict], int]:
        return [p.to_dict() for p in cls.query.all()], 200
