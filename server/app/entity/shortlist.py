from datetime import datetime, timezone
from sqlalchemy import or_
from ..extensions import db
from .service import Service  # <- to use increment_shortlist

class HomeownerShortlist(db.Model):
    __tablename__ = 'homeowner_shortlists'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    service_id = db.Column(db.Integer, db.ForeignKey('services.service_id'), nullable=False)
    added_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    __table_args__ = (
        db.UniqueConstraint('user_id', 'service_id', name='uq_user_service'),
    )

    @classmethod
    def add_service_to_shortlist(cls, user_id: int, service_id: int) -> tuple[dict, int]:
        existing = cls.query.filter_by(user_id=user_id, service_id=service_id).first()
        if existing:
            return {"error": "Service already in shortlist"}, 400

        # Create entry
        shortlist_entry = cls(
            user_id=user_id,
            service_id=service_id
        )
        db.session.add(shortlist_entry)

        # Increment shortlist count on the service
        Service.increment_shortlist(service_id)

        db.session.commit()
        return {"message": "Service added to shortlist successfully"}, 200

    @classmethod
    def remove_service_from_shortlist(cls, user_id: int, service_id: int) -> tuple[dict, int]:
        entry = cls.query.filter_by(user_id=user_id, service_id=service_id).first()
        if not entry:
            return {"error": "Service not found in shortlist"}, 404

        db.session.delete(entry)
        db.session.commit()
        return {"message": "Service removed from shortlist successfully"}, 200

    @classmethod
    def search_shortlisted_services(cls, user_id: int) -> tuple[list, int]:
        entries = cls.query.filter_by(user_id=user_id).all()
        result = [Service.query.get(e.service_id).to_dict() for e in entries if Service.query.get(e.service_id)]
        return result, 200

    @classmethod
    def view_shortlisted_services(cls, user_id: int, service_name: str = None, category_name: str = None) -> tuple[list, int]:
        query = Service.query.join(cls, Service.service_id == cls.service_id).filter(cls.user_id == user_id)
        if service_name:
            query = query.filter(Service.name.ilike(f"%{service_name}%"))
        if category_name:
            query = query.filter(Service.category_name.ilike(f"%{category_name}%"))

        return [service.to_dict() for service in query.all()], 200
