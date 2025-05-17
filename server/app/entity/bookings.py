from datetime import datetime, timezone
from ..extensions import db
from .user import User
from .service import Service
from .profile import Profile
from .category import Category

class Booking(db.Model):
    __tablename__ = 'bookings'

    booking_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    homeowner_user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    cleaner_user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    service_id = db.Column(db.Integer, db.ForeignKey('services.service_id'), nullable=False)
    service_name = db.Column(db.String(100), nullable=False)
    service_category = db.Column(db.String(50), nullable=False)
    cleaner_name = db.Column(db.String(100), nullable=False)
    homeowner_name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)

    booking_date = db.Column(db.DateTime, nullable=False, default=lambda: datetime.now(timezone.utc))

    def to_dict(self):
        return {
            "booking_id": self.booking_id,
            "homeowner_user_id": self.homeowner_user_id,
            "cleaner_user_id": self.cleaner_user_id,
            "service_id": self.service_id,
            "service_name": self.service_name,
            "service_category": self.service_category,
            "cleaner_name": self.cleaner_name,
            "homeowner_name": self.homeowner_name,
            "price": self.price,
            "booking_date": self.booking_date.isoformat()
        }

    @classmethod
    def create_booking(cls, homeowner_user_id: int, cleaner_user_id: int, service_id: int) -> tuple[dict, int]:
        cleaner_user_id = int(cleaner_user_id)
        homeowner_user_id = int(homeowner_user_id)
        service_id = int(service_id)

        service = Service.query.get(service_id)
        cleaner = User.query.get(cleaner_user_id)
        homeowner = User.query.get(homeowner_user_id)

        if not homeowner:
            return {"error": "Homeowner not found"}, 404
        if not cleaner:
            return {"error": "Cleaner not found"}, 404
        if not service:
            return {"error": "Service not found"}, 404

        if service.cleaner_id != cleaner_user_id:
            return {"error": "Service does not belong to the selected cleaner"}, 400

        booking = cls(
            homeowner_user_id=homeowner_user_id,
            cleaner_user_id=cleaner_user_id,
            service_id=service_id,
            service_name=service.name,
            service_category=service.category_name,
            cleaner_name=f"{cleaner.first_name} {cleaner.last_name}",
            homeowner_name=f"{homeowner.first_name} {homeowner.last_name}",
            price=service.price
        )

        db.session.add(booking)
        db.session.commit()
        return booking.to_dict(), 201

    @classmethod
    def get_booking_by_id(cls, booking_id: int) -> tuple[dict, int]:
        booking = cls.query.get(booking_id)
        if not booking:
            return {"error": "Booking not found"}, 404
        return booking.to_dict(), 200

    @classmethod
    def get_all_bookings(cls) -> tuple[list, int]:
        bookings = cls.query.all()
        return [b.to_dict() for b in bookings], 200
    
    @classmethod
    def get_booking_history(cls, user_id: int, service_id: int = None, start_date: str = None, end_date: str = None):
        try:
            user = User.query.get(user_id)
            if not user or not user.profile:
                return {"error": "User or profile not found"}, 404

            role_name = user.profile.role_name.lower()

            if role_name == "cleaner":
                query = cls.query.filter(cls.cleaner_user_id == user_id)
            elif role_name == "homeowner":
                query = cls.query.filter(cls.homeowner_user_id == user_id)
            else:
                return {"error": "Invalid role in profile"}, 400

            bookings = query.order_by(cls.booking_date.desc()).all()
            return [b.to_dict() for b in bookings], 200

        except Exception as e:
            return {"error": str(e)}, 500
