# cleaner.py
from server.app.extensions import db
from datetime import datetime

class Cleaner(db.Model):
    __tablename__ = 'cleaners'

    cleaner_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False, unique=True)
    bio = db.Column(db.Text, nullable=True)  # optional
    joined_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationship with User
    user = db.relationship("User", backref="cleaner", uselist=False)

    # Relationship with services
    services = db.relationship("Service", backref="cleaner", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "cleaner_id": self.cleaner_id,
            "user_id": self.user_id,
            "bio": self.bio,
            "joined_at": self.joined_at.isoformat(),
            "services": [service.to_dict() for service in self.services]
        }
