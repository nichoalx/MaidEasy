from app.entity.cleaner import Cleaner
from app.extensions import db

class CleanerController:
    def get_all_cleaners(self):
        cleaners = Cleaner.query.all()
        return [c.to_dict() for c in cleaners]

    def get_cleaner_by_id(self, cleaner_id):
        cleaner = Cleaner.query.get(cleaner_id)
        if cleaner:
            return cleaner.to_dict()
        return None

    def create_cleaner(self, data):
        cleaner = Cleaner(
            user_id=data.get('user_id'),
            years_of_experience=data.get('years_of_experience'),
            availability=data.get('availability'),
            bio=data.get('bio')
        )
        db.session.add(cleaner)
        db.session.commit()
        return {"message": "Cleaner created successfully", "cleaner": cleaner.to_dict()}

    def update_cleaner(self, cleaner_id, data):
        cleaner = Cleaner.query.get(cleaner_id)
        if cleaner:
            cleaner.years_of_experience = data.get('years_of_experience', cleaner.years_of_experience)
            cleaner.availability = data.get('availability', cleaner.availability)
            cleaner.bio = data.get('bio', cleaner.bio)
            db.session.commit()
            return {"message": "Cleaner updated successfully", "cleaner": cleaner.to_dict()}
        return {"error": "Cleaner not found"}

    def delete_cleaner(self, cleaner_id):
        cleaner = Cleaner.query.get(cleaner_id)
        if cleaner:
            db.session.delete(cleaner)
            db.session.commit()
            return {"message": "Cleaner deleted successfully"}
        return {"error": "Cleaner not found"}
