from server.app.extensions import db
from datetime import datetime, timezone

class Category(db.Model):
    __tablename__ = 'categories'

    category_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    category_name = db.Column(db.String(100), unique=True, nullable=False)
    description = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    def to_dict(self):
        return {
            "category_id": self.category_id,
            "category_name": self.category_name,
            "description": self.description,
            "created_at": self.created_at.isoformat()
        }

    @classmethod
    def create_category(cls, category_name, description=None):
        if cls.query.filter_by(category_name=category_name).one_or_none():
            return {"error": "Category already exists"}, 400

        category = cls(category_name=category_name, description=description)
        db.session.add(category)
        db.session.commit()
        return category.to_dict(), 201

    @classmethod
    def update_category(cls, category_id, data):
        category = cls.query.get(category_id)
        if not category:
            return {"error": "Category not found"}, 404

        if 'category_name' in data:
            if cls.query.filter_by(category_name=data['category_name']).one_or_none():
                return {"error": "Category name already in use"}, 400
            category.category_name = data['category_name']

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
    def get_category_by_id(cls, category_id):
        category = cls.query.get(category_id)
        if not category:
            return {"error": "Category not found"}, 404
        return category.to_dict(), 200