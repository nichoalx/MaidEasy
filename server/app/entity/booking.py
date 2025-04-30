# from datetime import datetime
# from server.app.extensions import db

# class Booking(db.Model):
#     __tablename__ = 'bookings'

#     booking_id = db.Column(db.Integer, primary_key=True)
#     homeowner_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
#     cleaner_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=True)
#     service_type = db.Column(db.String(50), nullable=False)
#     booking_date = db.Column(db.DateTime, nullable=False)
#     duration_hours = db.Column(db.Float, nullable=False)
#     address = db.Column(db.String(200), nullable=False)
#     special_requests = db.Column(db.Text)
#     status = db.Column(db.String(20), default='confirmed')
#     created_at = db.Column(db.DateTime, default=datetime.utcnow)
#     updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

#     def __init__(self, homeowner_id, service_type, booking_date, duration_hours, address, 
#                  cleaner_id=None, special_requests=None, status='confirmed'):
#         self.homeowner_id = homeowner_id
#         self.cleaner_id = cleaner_id
#         self.service_type = service_type
#         self.booking_date = booking_date
#         self.duration_hours = duration_hours
#         self.address = address
#         self.special_requests = special_requests
#         self.status = status

#     def to_dict(self):
#         return {
#             "booking_id": self.booking_id,
#             "homeowner_id": self.homeowner_id,
#             "cleaner_id": self.cleaner_id,
#             "service_type": self.service_type,
#             "booking_date": self.booking_date.isoformat(),
#             "duration_hours": self.duration_hours,
#             "address": self.address,
#             "special_requests": self.special_requests,
#             "status": self.status,
#             "created_at": self.created_at.isoformat(),
#             "updated_at": self.updated_at.isoformat()
#         }
