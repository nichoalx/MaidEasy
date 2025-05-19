from flask import Blueprint, jsonify
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
        return jsonify({
            "users": User.query.count(),
            "profiles": Profile.query.count(),
            "services": Service.query.count(),
            "categories": Category.query.count(),
            "bookings": Booking.query.count()
        }), 200

    @staticmethod
    @login_required
    @report_blueprint.route('/api/report/daily', methods=['GET'])
    def daily_report():
        today = datetime.now(timezone.utc).date()
        count = Booking.get_booking_count_by_date_range(today)
        return jsonify({"date": str(today), "bookings": count}), 200

    @staticmethod
    @login_required
    @report_blueprint.route('/api/report/weekly', methods=['GET'])
    def weekly_report():
        today = datetime.now(timezone.utc).date()
        week_start = today - timedelta(days=today.weekday())
        count = Booking.get_booking_count_by_date_range(week_start)
        return jsonify({"week_start": str(week_start), "bookings": count}), 200

    @staticmethod
    @login_required
    @report_blueprint.route('/api/report/monthly', methods=['GET'])
    def monthly_report():
        today = datetime.now(timezone.utc).date()
        month_start = today.replace(day=1)
        count = Booking.get_booking_count_by_date_range(month_start)
        return jsonify({"month_start": str(month_start), "bookings": count}), 200