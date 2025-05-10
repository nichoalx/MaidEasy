from datetime import datetime
from sqlalchemy import or_
from ..extensions import db
from ..entity import Service

class HomeownerShortlist(db.Model):
    __tablename__ = 'homeowner_shortlists'

    id = db.Column(db.Integer, primary_key=True)
    homeowner_id = db.Column(db.Integer, db.ForeignKey('homeowners.homeowner_id'), nullable=False)
    cleaner_service_id = db.Column(db.Integer, db.ForeignKey('services.service_id'), nullable=False)
    added_at = db.Column(db.DateTime, default=datetime.utcnow)

    __table_args__ = (
        db.UniqueConstraint('homeowner_id', 'cleaner_service_id', name='uq_homeowner_cleaner'),
    )

    @classmethod
    def add_cleaner_to_shortlist(cls, homeowner_id: int, cleaner_service_id: int) -> tuple[dict, int]:
        existing = cls.query.filter_by(homeowner_id=homeowner_id, cleaner_service_id=cleaner_service_id).first()
        if existing:
            return {"error": "Cleaner already in shortlist"}, 400

        shortlist_entry = cls(
            homeowner_id=homeowner_id,
            cleaner_service_id=cleaner_service_id,
            added_at=datetime.utcnow()
        )
        db.session.add(shortlist_entry)
        db.session.commit()
        return {"message": "Cleaner added to shortlist successfully"}, 200

    @classmethod
    def view_shortlisted_cleaners(cls, homeowner_id: int) -> tuple[list, int]:
        entries = cls.query.filter_by(homeowner_id=homeowner_id).all()
        result = [Service.query.get(e.cleaner_service_id).to_dict() for e in entries if Service.query.get(e.cleaner_service_id)]
        return result, 200

    @classmethod
    def search_shortlisted_cleaners(cls, homeowner_id: int, name=None, category=None) -> tuple[list, int]:
        query = Service.query.join(cls, Service.service_id == cls.cleaner_service_id).filter(cls.homeowner_id == homeowner_id)

        if name:
            query = query.filter(Service.name.ilike(f"%{name}%"))
        if category:
            query = query.filter(Service.category.ilike(f"%{category}%"))

        return [service.to_dict() for service in query.all()], 200
