from flask import Blueprint, jsonify, request
from . import db
from .models import Brew

api = Blueprint("api", __name__, url_prefix="/api")


REQUIRED_FIELDS = [
    "coffee_name",
    "brew_method",
    "dose_grams",
    "water_ml",
    "brew_time_seconds",
    "notes",
]


def validate_brew(data):
    if not isinstance(data, dict):
        return "Request body must be a JSON object."

    missing = [
        field for field in REQUIRED_FIELDS
        if field not in data or data[field] is None or str(data[field]).strip() == ""
    ]

    if missing:
        return f"Missing required fields: {', '.join(missing)}"

    try:
        dose = float(data["dose_grams"])
        water = float(data["water_ml"])
        brew_time = int(data["brew_time_seconds"])
    except (TypeError, ValueError):
        return "Dose, water and brew time must be valid numbers."

    if dose <= 0 or water <= 0 or brew_time <= 0:
        return "Dose, water and brew time must be greater than zero."

    return None


@api.get("/brews")
def list_brews():
    method = request.args.get("method", "").strip()

    query = Brew.query.order_by(Brew.created_at.desc())
    if method:
        query = query.filter_by(brew_method=method)

    brews = query.all()
    total_count = Brew.query.count()

    return jsonify({
        "brews": [brew.to_dict() for brew in brews],
        "count": total_count,
    }), 200


@api.get("/brews/<int:brew_id>")
def get_brew(brew_id):
    brew = db.session.get(Brew, brew_id)

    if brew is None:
        return jsonify({"error": "Brew not found"}), 404

    return jsonify(brew.to_dict()), 200


@api.post("/brews")
def create_brew():
    data = request.get_json(silent=True)
    error = validate_brew(data)

    if error:
        return jsonify({"error": error}), 400

    brew = Brew(
        coffee_name=data["coffee_name"].strip(),
        brew_method=data["brew_method"].strip(),
        dose_grams=float(data["dose_grams"]),
        water_ml=float(data["water_ml"]),
        brew_time_seconds=int(data["brew_time_seconds"]),
        notes=data["notes"].strip(),
    )

    db.session.add(brew)
    db.session.commit()

    return jsonify(brew.to_dict()), 201


@api.put("/brews/<int:brew_id>")
def update_brew(brew_id):
    brew = db.session.get(Brew, brew_id)

    if brew is None:
        return jsonify({"error": "Brew not found"}), 404

    data = request.get_json(silent=True)
    error = validate_brew(data)

    if error:
        return jsonify({"error": error}), 400

    brew.coffee_name = data["coffee_name"].strip()
    brew.brew_method = data["brew_method"].strip()
    brew.dose_grams = float(data["dose_grams"])
    brew.water_ml = float(data["water_ml"])
    brew.brew_time_seconds = int(data["brew_time_seconds"])
    brew.notes = data["notes"].strip()

    db.session.commit()

    return jsonify(brew.to_dict()), 200


@api.delete("/brews/<int:brew_id>")
def delete_brew(brew_id):
    brew = db.session.get(Brew, brew_id)

    if brew is None:
        return jsonify({"error": "Brew not found"}), 404

    db.session.delete(brew)
    db.session.commit()

    return jsonify({"message": "Brew deleted successfully"}), 200
