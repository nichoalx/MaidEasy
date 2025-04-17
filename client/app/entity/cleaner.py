from app.extensions import db

class Cleaner(db.Model):
    __tablename__ = 'cleaners'

    cleaner_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    years_of_experience = db.Column(db.Integer, nullable=False)
    availability = db.Column(db.String(100), nullable=False)
    bio = db.Column(db.String(255))

    def __init__(self, user_id, years_of_experience, availability, bio=None):
        self.user_id = user_id
        self.years_of_experience = years_of_experience
        self.availability = availability
        self.bio = bio

    def to_dict(self):
        return {
            "cleaner_id": self.cleaner_id,
            "user_id": self.user_id,
            "years_of_experience": self.years_of_experience,
            "availability": self.availability,
            "bio": self.bio
        }
