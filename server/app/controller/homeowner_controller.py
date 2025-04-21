from app.entity.homeowner import Homeowner
from app.extensions import db

class HomeownerController:
    def get_all_homeowners(self):
        homeowners = Homeowner.query.all()
        return [h.to_dict() for h in homeowners]

    def get_homeowner_by_id(self, homeowner_id):
        homeowner = Homeowner.query.get(homeowner_id)
        if homeowner:
            return homeowner.to_dict()
        return None

    def create_homeowner(self, data):
        homeowner = Homeowner(
            user_id=data.get('user_id'),
            address=data.get('address'),
            preferred_cleaning_time=data.get('preferred_cleaning_time')
        )
        db.session.add(homeowner)
        db.session.commit()
        return {"message": "Homeowner created successfully", "homeowner": homeowner.to_dict()}

    def update_homeowner(self, homeowner_id, data):
        homeowner = Homeowner.query.get(homeowner_id)
        if homeowner:
            homeowner.address = data.get('address', homeowner.address)
            homeowner.preferred_cleaning_time = data.get('preferred_cleaning_time', homeowner.preferred_cleaning_time)
            db.session.commit()
            return {"message": "Homeowner updated successfully", "homeowner": homeowner.to_dict()}
        return {"error": "Homeowner not found"}

    def delete_homeowner(self, homeowner_id):
        homeowner = Homeowner.query.get(homeowner_id)
        if homeowner:
            db.session.delete(homeowner)
            db.session.commit()
            return {"message": "Homeowner deleted successfully"}
        return {"error": "Homeowner not found"}
