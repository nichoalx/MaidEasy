from app.entity import Category
from app.extensions import db

class CategoryController:
    def get_all_categories(self):
        """
        Retrieve all categories from the database.
        Returns:
            List of category dictionaries
        """
        categories = Category.query.order_by(Category.name).all()
        return [category.to_dict() for category in categories]

    def create_category(self, data):
        """
        Create a new category and save it to the database.
        Args:
            data: Dictionary containing category attributes
        Returns:
            Dictionary with operation result
        """
        if Category.query.filter_by(name=data['name']).first():
            return {"error": "Category with this name already exists"}, 400

        category = Category(
            name=data['name'],
        )
        
        db.session.add(category)
        db.session.commit()
        return {"message": "Category created successfully", "category": category.to_dict()}

    def get_category_by_id(self, category_id):
        """
        Retrieve a category by its ID.
        Args:
            category_id: ID of the category to retrieve
        Returns:
            Category dictionary if found, error message otherwise
        """
        category = Category.query.get(category_id)
        if category:
            return category.to_dict()
        return {"error": "Category not found"}, 404

    def update_category(self, category_id, data):
        """
        Update an existing category's details.
        Args:
            category_id: ID of the category to update
            data: Dictionary containing attributes to update
        Returns:
            Dictionary with operation result
        """
        category = Category.query.get(category_id)
        if not category:
            return {"error": "Category not found"}, 404

        if 'name' in data and data['name'] != category.name:
            if Category.query.filter_by(name=data['name']).first():
                return {"error": "Category with this name already exists"}, 400

        category.name = data.get('name', category.name)

        db.session.commit()
        return {"message": "Category updated successfully", "category": category.to_dict()}

    def delete_category(self, category_id):
        """
        Delete a category by its ID.
        Args:
            category_id: ID of the category to delete
        Returns:
            Dictionary with operation result
        """
        category = Category.query.get(category_id)
        if not category:
            return {"error": "Category not found"}, 404

        db.session.delete(category)
        db.session.commit()
        return {"message": "Category deleted successfully"}

    def search_categories(self, query):
        """
        Search for categories by name.
        Args:
            query: Search term
        Returns:
            List of matching category dictionaries
        """
        search = f"%{query}%"
        categories = Category.query.filter(
            Category.name.ilike(search)
        ).order_by(Category.name).all()
        
        return [category.to_dict() for category in categories]
