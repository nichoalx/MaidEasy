from server.app.extensions import db
from datetime import datetime, timezone

class Category(db.Model):
    __tablename__ = 'categories'

    category_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    description = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    def to_dict(self):
        return {
            "category_id": self.category_id,
            "name": self.name,
            "description": self.description,
            "created_at": self.created_at.isoformat()
        }

    @classmethod
    def create_category(cls, name, description=None):
        if cls.query.filter_by(name=name).first():
            return {"error": "Category already exists"}, 400

        category = cls(name=name, description=description)
        db.session.add(category)
        db.session.commit()
        return category.to_dict(), 201

    @classmethod
    def update_category(cls, category_id, data):
        category = cls.query.get(category_id)
        if not category:
            return {"error": "Category not found"}, 404

        if 'name' in data:
            if cls.query.filter_by(name=data['name']).first():
                return {"error": "Category name already in use"}, 400
            category.name = data['name']

        if 'description' in data:
            category.description = data['description']

        db.session.commit()
        return category.to_dict(), 200

    @classmethod
    def delete_category(cls, category_id):
        category = cls.query.get(category_id)
        if not category:
            return {"error": "Category not found"}, 404

        db.session.delete(category)
        db.session.commit()
        return {"message": "Category deleted successfully"}, 200

    @classmethod
    def get_all_categories(cls):
        return [cat.to_dict() for cat in cls.query.all()], 200

    @classmethod
    def search_categories(cls, name=None):
        query = cls.query
        if name:
            query = query.filter(cls.name.ilike(f"%{name}%"))
        return [cat.to_dict() for cat in query.all()], 200
