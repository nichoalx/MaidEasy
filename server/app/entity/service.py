# service.py
from ..extensions import db
from datetime import datetime, timezone
from .user import User
from .category import Category


class Service(db.Model):
    __tablename__ = 'services'

    service_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    cleaner_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    category_name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(255), nullable=True)
    price = db.Column(db.Float, nullable=False)
    contact_number = db.Column(db.String(15), nullable=True)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    duration = db.Column(db.String(50), nullable=True)  # Duration of the service
    availability = db.Column(db.String(50), nullable=True)  # Availability of the service
    view_count = db.Column(db.Integer, default=0)
    shortlist_count = db.Column(db.Integer, default=0)

    # Relationship with Cleaner
    cleaner = db.relationship('User', backref='services')

    def to_dict(self) -> dict:
        return {
            "service_id": self.service_id,
            "cleaner_id": self.cleaner_id,
            "name": self.name,
            "category_name": self.category_name,
            "description": self.description,
            "price": self.price,
            "contact_number": self.contact_number,
            "created_at": self.created_at.isoformat(),
            "duration": self.duration,
            "availability": self.availability,
            "view_count": self.view_count,
            "shortlist_count": self.shortlist_count
        }

    @classmethod
    def create_service(cls, cleaner_id, name, category_name, description, price, duration, availability):
        cleaner = User.query.get(cleaner_id)
        category = Category.query.filter_by(category_name=category_name).one_or_none()
        if not cleaner:
            return {"error": "Cleaner (User) not found"}, 404

        new_service = cls(
            cleaner_id=cleaner_id,
            name=name,
            category_name=category.category_name,  # snapshot
            description=description,
            price=price,
            duration=duration,
            availability=availability,
            contact_number=cleaner.contact_number  # snapshot
        )
        db.session.add(new_service)
        db.session.commit()
        return new_service.to_dict(), 201

    @classmethod
    def update_service(cls, service_id, data):
        service = cls.query.get(service_id)
        if not service:
            return {"error": "Service not found"}, 404

        if 'name' in data:
            service.name = data['name']
        if 'category' in data:
            service.category = data['category']
        if 'description' in data:
            service.description = data['description']
        if 'price' in data:
            service.price = data['price']
        if 'duration' in data:
            service.duration = data['duration']
        if 'availability' in data:
            service.availability = data['availability']


        db.session.commit()
        return service.to_dict(), 200

    @classmethod
    def delete_service(cls, service_id):
        service = cls.query.get(service_id)
        if not service:
            return {"error": "Service not found"}, 404

        db.session.delete(service)
        db.session.commit()
        return {"message": "Service deleted successfully"}, 200
    
    @classmethod
    def search_services(cls, name=None, category=None):
        query = cls.query

        if name:
            query = query.filter(cls.name.ilike(f"%{name}%"))
        if category:
            query = query.filter(cls.category.ilike(f"%{category}%"))

        services = query.all()
        return [service.to_dict() for service in services], 200
    
    @classmethod
    def get_services_by_cleaner(cls, cleaner_id):
        services = cls.query.filter_by(cleaner_id=cleaner_id).all()
        return [service.to_dict() for service in services], 200

    @classmethod
    def get_all_services(cls):
        services = cls.query.all()
        return [service.to_dict() for service in services], 200
    
    @classmethod
    def get_service_by_id(cls, service_id):
        service = cls.query.get(service_id)
        if not service:
            return {"error": "Service not found"}, 404
        return service.to_dict(), 200

    @classmethod
    def increment_view(cls, service_id):
        service = cls.query.get(service_id)
        if service:
            service.view_count += 1
            db.session.commit()
            return {"message": "View count incremented"}, 200
        return {"error": "Service not found"}, 404

    @classmethod
    def increment_shortlist(cls, service_id):
        service = cls.query.get(service_id)
        if service:
            service.shortlist_count += 1
            db.session.commit()
            return {"message": "Shortlist count incremented"}, 200
        return {"error": "Service not found"}, 404
