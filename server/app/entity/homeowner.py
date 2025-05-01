from datetime import datetime
from sqlalchemy import or_

from ..extensions import db

class Homeowner(db.Model):
    """Homeowner entity model"""
    
    __tablename__ = 'homeowners'
    
    homeowner_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    address = db.Column(db.String(255), nullable=False)

    # Relationships
    user = db.relationship('User', backref='homeowner', uselist=False)
    shortlisted_cleaners = db.relationship('Cleaner', secondary='homeowner_shortlists', backref='shortlisted_by')
    bookings = db.relationship('Booking', backref='homeowner')
    
    def to_dict(self):
        """Convert homeowner object to dictionary"""
        return {
            'homeowner_id': self.id,
            'user_id': self.user_id,
            'address': self.address,
            'user': self.user.to_dict() if self.user else None
        }
    
    #------------HOMEOWNER CRUDS----------------#

    # 1. View cleaning services
    @classmethod
    def view_cleaning_services(cls) -> tuple[list, int]:
        """View all available cleaning services"""
        try:
            from ..entity import Service
            services = Service.query.all()
            return [service.to_dict() for service in services], 200
        except Exception as e:
            return {"error": str(e)}, 500
    
    # 2. Search cleaner
    @classmethod
    def search_cleaners(cls, name=None, service_type=None, rating=None, location=None) -> tuple[list, int]:
        """Search cleaners by various criteria"""
        try:
            from ..entity import Cleaner
            from ..entity import User
            query = Cleaner.query
            
            if name:
                # Join with User model to search by name
                query = query.join(Cleaner.user).filter(
                    or_(
                        User.first_name.ilike(f'%{name}%'),
                        User.last_name.ilike(f'%{name}%')
                    )
                )
            
            if service_type:
                # Join with CleaningService model
                from ..entity import Service
                query = query.join(Cleaner.services).filter(
                    Service.type.ilike(f'%{service_type}%')
                )
                
            if rating:
                query = query.filter(Cleaner.average_rating >= float(rating))
                
            if location:
                query = query.filter(
                    or_(
                        Cleaner.service_area.ilike(f'%{location}%'),
                        Cleaner.city.ilike(f'%{location}%'),
                        Cleaner.state.ilike(f'%{location}%')
                    )
                )
                
            cleaners = query.all()
            return [cleaner.to_dict() for cleaner in cleaners], 200
            
        except Exception as e:
            return {"error": str(e)}, 500
    
    # 3. Save cleaner into shortlist
    @classmethod
    def add_cleaner_to_shortlist(self, cleaner_id: int) -> tuple[dict, int]:
        """Add a cleaner to the homeowner's shortlist"""
        try:
            from ..entity import Cleaner
            from ..entity import HomeownerShortlist
            
            cleaner = Cleaner.query.get(cleaner_id)
            if not cleaner:
                return {"error": "Cleaner not found"}, 404
                
            # Check if cleaner is already in shortlist
            existing = HomeownerShortlist.query.filter_by(
                homeowner_id=self.id,
                cleaner_id=cleaner_id
            ).first()
            
            if existing:
                return {"error": "Cleaner already in shortlist"}, 400
                
            # Add to shortlist
            shortlist_entry = HomeownerShortlist(
                homeowner_id=self.id,
                cleaner_id=cleaner_id,
                added_at=datetime.utcnow()
            )
            
            db.session.add(shortlist_entry)
            db.session.commit()
            
            return {"message": "Cleaner added to shortlist successfully"}, 200
            
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}, 500
    
    # 4. Search cleaner in the shortlist
    @classmethod
    def search_shortlisted_cleaners(self, name=None, service_type=None) -> tuple[list, int]:
        """Search within shortlisted cleaners"""
        try:
            shortlisted = self.shortlisted_cleaners
            result = []
            
            for cleaner in shortlisted:
                # Filter by name if provided
                if name:
                    user = cleaner.user
                    if not (name.lower() in user.first_name.lower() or 
                            name.lower() in user.last_name.lower()):
                        continue
                
                # Filter by service type if provided
                if service_type:
                    service_match = False
                    for service in cleaner.services:
                        if service_type.lower() in service.type.lower():
                            service_match = True
                            break
                    if not service_match:
                        continue
                
                result.append(cleaner.to_dict())
            
            return result, 200
            
        except Exception as e:
            return {"error": str(e)}, 500
    
    # 5. View cleaner from shortlist
    @classmethod
    def view_shortlisted_cleaners(self) -> tuple[list, int]:
        """View all cleaners in the shortlist"""
        try:
            shortlisted = self.shortlisted_cleaners
            result = [cleaner.to_dict() for cleaner in shortlisted]
            return result, 200
            
        except Exception as e:
            return {"error": str(e)}, 500
    
    # 6. Search past bookings
    @classmethod
    def search_past_bookings(self, cleaner_name=None, service_type=None, 
                             start_date=None, end_date=None) -> tuple[list, int]:
        """Search past bookings with filters"""
        try:
            from ..entity import Booking
            
            # Get all bookings for this homeowner that are in the past
            query = Booking.query.filter(
                Booking.homeowner_id == self.id,
                Booking.booking_date < datetime.utcnow()
            )
            
            if cleaner_name:
                # Join with Cleaner and User models to filter by cleaner name
                from ..entity import Cleaner
                from ..entity import User
                query = query.join(Booking.cleaner).join(Cleaner.user).filter(
                    or_(
                        User.first_name.ilike(f'%{cleaner_name}%'),
                        User.last_name.ilike(f'%{cleaner_name}%')
                    )
                )
                
            if service_type:
                # Filter by service type
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
    
    # 7. View past bookings
    @classmethod
    def view_past_bookings(self) -> tuple[list, int]:
        """View all past bookings"""
        try:
            from ..entity import Booking
            
            past_bookings = Booking.query.filter(
                Booking.homeowner_id == self.id,
                Booking.booking_date < datetime.utcnow()
            ).order_by(Booking.booking_date.desc()).all()
            
            return [booking.to_dict() for booking in past_bookings], 200
            
        except Exception as e:
            return {"error": str(e)}, 500

# This model represents the many-to-many relationship for shortlisted cleaners
class HomeownerShortlist(db.Model):
    """Homeowner's shortlisted cleaners"""
    
    __tablename__ = 'homeowner_shortlists'
    
    id = db.Column(db.Integer, primary_key=True)
    homeowner_id = db.Column(db.Integer, db.ForeignKey('homeowners.id'), nullable=False)
    cleaner_id = db.Column(db.Integer, db.ForeignKey('cleaners.id'), nullable=False)
    added_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Define unique constraint to prevent duplicates
    __table_args__ = (
        db.UniqueConstraint('homeowner_id', 'cleaner_id', name='uq_homeowner_cleaner'),
    )