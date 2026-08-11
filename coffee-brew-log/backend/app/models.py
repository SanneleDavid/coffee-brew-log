from datetime import datetime
from . import db


class Brew(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    coffee_name = db.Column(db.String(120), nullable=False)
    brew_method = db.Column(db.String(50), nullable=False)
    dose_grams = db.Column(db.Float, nullable=False)
    water_ml = db.Column(db.Float, nullable=False)
    brew_time_seconds = db.Column(db.Integer, nullable=False)
    notes = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "coffee_name": self.coffee_name,
            "brew_method": self.brew_method,
            "dose_grams": self.dose_grams,
            "water_ml": self.water_ml,
            "brew_time_seconds": self.brew_time_seconds,
            "notes": self.notes,
            "created_at": self.created_at.isoformat(),
        }
