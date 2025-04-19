from app.entity import Booking
from app.extensions import db
from datetime import datetime

class BookingController:
    def get_filtered_bookings(self, service_type=None, start_date=None, end_date=None):
        """
        Retrieve bookings filtered by service type and/or date range.
        
        Args:
            service_type: Optional filter for specific service type
            start_date: Optional start date for filtering
            end_date: Optional end date for filtering
            
        Returns:
            List of filtered booking dictionaries
        """
        query = Booking.query
        
        # Apply service type filter if provided
        if service_type:
            query = query.filter(Booking.service_type == service_type)
        
        # Apply date range filter if provided
        if start_date and end_date:
            query = query.filter(Booking.booking_date.between(start_date, end_date))
        elif start_date:
            query = query.filter(Booking.booking_date >= start_date)
        elif end_date:
            query = query.filter(Booking.booking_date <= end_date)
        
        bookings = query.order_by(Booking.booking_date).all()
        return [booking.to_dict() for booking in bookings]

    def get_booking_by_id(self, booking_id):
        """Retrieve a single booking by its ID."""
        booking = Booking.query.get(booking_id)
        if booking:
            return booking.to_dict()
        return {"error": "Booking not found"}

    def get_user_bookings(self, user_id):
        """Retrieve all bookings for a specific user (either as customer or cleaner)."""
        bookings = Booking.query.filter(
            (Booking.homeowner_id == user_id) | (Booking.cleaner_id == user_id)
        ).order_by(Booking.booking_date).all()
        return [booking.to_dict() for booking in bookings]

    def create_booking(self, data):
        """Create a new booking."""
        booking = Booking(
            homeowner_id=data['homeowner_id'],
            service_type=data['service_type'],
            booking_date=datetime.fromisoformat(data['booking_date']),
            duration_hours=data['duration_hours'],
            address=data['address'],
            special_requests=data.get('special_requests'),
            cleaner_id=data.get('cleaner_id'),
            status=data.get('status', 'confirmed')
        )
        db.session.add(booking)
        db.session.commit()
        return {"message": "Booking created successfully", "booking": booking.to_dict()}

    def update_booking_status(self, booking_id, new_status):
        """Update the status of a booking."""
        booking = Booking.query.get(booking_id)
        if booking:
            booking.status = new_status
            db.session.commit()
            return {"message": "Booking status updated", "booking": booking.to_dict()}
        return {"error": "Booking not found"}
