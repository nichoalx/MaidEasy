from app.extensions import db

class Homeowner(db.Model):
    __tablename__ = 'homeowners'

    homeowner_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    address = db.Column(db.String(255), nullable=False)
    preferred_cleaning_time = db.Column(db.String(100))

    def __init__(self, user_id, address, preferred_cleaning_time=None):
        self.user_id = user_id
        self.address = address
        self.preferred_cleaning_time = preferred_cleaning_time

    def to_dict(self):
        return {
            "homeowner_id": self.homeowner_id,
            "user_id": self.user_id,
            "address": self.address,
            "preferred_cleaning_time": self.preferred_cleaning_time
        }
