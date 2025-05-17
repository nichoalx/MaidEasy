from flask import Blueprint, jsonify
from server.app.extensions import db
from server.app.entity.user import User
from server.app.entity.profile import Profile
from server.app.entity.service import Service
from server.app.entity.category import Category
from server.app.entity.bookings import Booking
from datetime import datetime, timedelta, timezone
from server.app.controller.auth.permission_required import login_required

report_blueprint = Blueprint('report', __name__)

class ReportController:
    @staticmethod
    @login_required
    @report_blueprint.route('/api/report/summary', methods=['GET'])
    def generate_summary():
        users_count = User.query.count()
        profiles_count = Profile.query.count()
        services_count = Service.query.count()
        categories_count = Category.query.count()
        bookings_count = Booking.query.count()

        return jsonify({
            "users": users_count,
            "profiles": profiles_count,
            "services": services_count,
            "categories": categories_count,
            "bookings": bookings_count
        }), 200

    @staticmethod
    @login_required
    @report_blueprint.route('/api/report/daily', methods=['GET'])
    def daily_report():
        today = datetime.now(timezone.utc).date()
        bookings_today = Booking.query.filter(Booking.booking_date >= today).count()
        return jsonify({"date": str(today), "bookings": bookings_today}), 200

    @staticmethod
    @login_required
    @report_blueprint.route('/api/report/weekly', methods=['GET'])
    def weekly_report():
        today = datetime.now(timezone.utc).date()
        week_start = today - timedelta(days=today.weekday())
        bookings_week = Booking.query.filter(Booking.booking_date >= week_start).count()
        return jsonify({"week_start": str(week_start), "bookings": bookings_week}), 200

    @staticmethod
    @login_required
    @report_blueprint.route('/api/report/monthly', methods=['GET'])
    def monthly_report():
        today = datetime.now(timezone.utc).date()
        month_start = today.replace(day=1)
        bookings_month = Booking.query.filter(Booking.booking_date >= month_start).count()
        return jsonify({"month_start": str(month_start), "bookings": bookings_month}), 200
