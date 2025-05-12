from datetime import datetime, timedelta
from sqlalchemy import func
from server.app.extensions import db
from .user import User
from .service import Service
from .bookings import Booking
from .category import Category

class Report:
    @classmethod
    def get_summary(cls) -> dict:
        """Return overall system statistics"""
        return {
            "total_users": db.session.query(User).count(),
            "total_services": db.session.query(Service).count(),
            "total_categories": db.session.query(Category).count(),
            "total_bookings": db.session.query(Booking).count(),
        }

    @classmethod
    def get_daily_report(cls, date: datetime) -> dict:
        """Get report stats for a specific day"""
        start = datetime.combine(date, datetime.min.time())
        end = datetime.combine(date, datetime.max.time())

        return {
            "bookings": db.session.query(Booking).filter(Booking.booking_date.between(start, end)).count(),
            "services_created": db.session.query(Service).filter(Service.created_at.between(start, end)).count(),
            "users_registered": db.session.query(User).filter(User.dob.between(start, end)).count(),  # Assuming DOB is used for testing
        }

    @classmethod
    def get_weekly_report(cls, start_date: datetime) -> dict:
        """Get stats for the 7-day period starting from start_date"""
        end_date = start_date + timedelta(days=7)

        return {
            "bookings": db.session.query(Booking).filter(Booking.booking_date.between(start_date, end_date)).count(),
            "services_created": db.session.query(Service).filter(Service.created_at.between(start_date, end_date)).count(),
            "new_users": db.session.query(User).filter(User.dob.between(start_date, end_date)).count(),
        }

    @classmethod
    def get_monthly_report(cls, year: int, month: int) -> dict:
        """Get stats for a specific month"""
        from calendar import monthrange
        start = datetime(year, month, 1)
        end = datetime(year, month, monthrange(year, month)[1], 23, 59, 59)

        return {
            "bookings": db.session.query(Booking).filter(Booking.booking_date.between(start, end)).count(),
            "services_created": db.session.query(Service).filter(Service.created_at.between(start, end)).count(),
            "new_users": db.session.query(User).filter(User.dob.between(start, end)).count(),
        }
