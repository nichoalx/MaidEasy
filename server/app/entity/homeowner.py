from datetime import datetime
from sqlalchemy import or_
from ..extensions import db
from ..entity import Cleaner, User, Service, Booking

class Homeowner(db.Model):
    __tablename__ = 'homeowners'

    homeowner_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    address = db.Column(db.String(255), nullable=False)

    # Relationships
    user = db.relationship('User', backref='homeowner', uselist=False)
    bookings = db.relationship('Booking', backref='homeowner')

    def to_dict(self):
        return {
            'homeowner_id': self.homeowner_id,
            'user_id': self.user_id,
            'address': self.address,
            'user': self.user.to_dict() if self.user else None
        }

    # --- Homeowner methods ---

    @classmethod
    def view_cleaning_services(cls) -> tuple[list, int]:
        try:
            services = Service.query.all()
            return [services.to_dict() for service in services], 200
        except Exception as e:
            return {"error": str(e)}, 500

    @classmethod
    def search_past_bookings(self, cleaner_name=None, service_type=None,
                             start_date=None, end_date=None) -> tuple[list, int]:
        try:
            query = Booking.query.filter(
                Booking.homeowner_id == self.homeowner_id,
                Booking.booking_date < datetime.utcnow()
            )

            if cleaner_name:
                query = query.join(Booking.cleaner).join(Cleaner.user).filter(
                    or_(User.first_name.ilike(f'%{cleaner_name}%'),
                        User.last_name.ilike(f'%{cleaner_name}%'))
                )

            if service_type:
                query = query.filter(Booking.service_type.ilike(f'%{service_type}%'))

            if start_date:
                try:
                    start = datetime.strptime(start_date, '%Y-%m-%d')
                    query = query.filter(Booking.booking_date >= start)
                except ValueError:
                    return {"error": "Invalid start date format. Use YYYY-MM-DD."}, 400

            if end_date:
                try:
                    end = datetime.strptime(end_date, '%Y-%m-%d')
                    query = query.filter(Booking.booking_date <= end)
                except ValueError:
                    return {"error": "Invalid end date format. Use YYYY-MM-DD."}, 400

            bookings = query.order_by(Booking.booking_date.desc()).all()
            return [booking.to_dict() for booking in bookings], 200

        except Exception as e:
            return {"error": str(e)}, 500

    @classmethod
    def view_past_bookings(self) -> tuple[list, int]:
        try:
            past_bookings = Booking.query.filter(
                Booking.homeowner_id == self.homeowner_id,
                Booking.booking_date < datetime.utcnow()
            ).order_by(Booking.booking_date.desc()).all()
            return [booking.to_dict() for booking in past_bookings], 200
        except Exception as e:
            return {"error": str(e)}, 500

