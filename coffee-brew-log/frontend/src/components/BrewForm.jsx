import { useEffect, useState } from "react";

const emptyBrew = {
  coffee_name: "",
  brew_method: "",
  dose_grams: "",
  water_ml: "",
  brew_time_seconds: "",
  notes: "",
};

const methods = ["Pour Over", "French Press", "AeroPress", "Espresso", "Cold Brew"];

export default function BrewForm({ editingBrew, onSave, onCancel }) {
  const [form, setForm] = useState(emptyBrew);
  const [error, setError] = useState("");

  useEffect(() => {
    setForm(editingBrew ? {
      coffee_name: editingBrew.coffee_name,
      brew_method: editingBrew.brew_method,
      dose_grams: editingBrew.dose_grams,
      water_ml: editingBrew.water_ml,
      brew_time_seconds: editingBrew.brew_time_seconds,
      notes: editingBrew.notes,
    } : emptyBrew);
    setError("");
  }, [editingBrew]);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const hasBlank = Object.values(form).some(
      (value) => String(value).trim() === ""
    );

    if (hasBlank) {
      setError("Please fill in every field.");
      return;
    }

    setError("");

    try {
      await onSave(form);
      if (!editingBrew) {
        setForm(emptyBrew);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h2 className="h4 mb-3">
          {editingBrew ? "Edit Brew" : "Log a New Brew"}
        </h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Coffee name</label>
              <input
                className="form-control"
                name="coffee_name"
                value={form.coffee_name}
                onChange={handleChange}
                placeholder="Ethiopia Yirgacheffe"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Brew method</label>
              <select
                className="form-select"
                name="brew_method"
                value={form.brew_method}
                onChange={handleChange}
              >
                <option value="">Choose a method</option>
                {methods.map((method) => (
                  <option key={method} value={method}>{method}</option>
                ))}
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label">Coffee dose (g)</label>
              <input
                type="number"
                min="0.1"
                step="0.1"
                className="form-control"
                name="dose_grams"
                value={form.dose_grams}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Water (ml)</label>
              <input
                type="number"
                min="0.1"
                step="0.1"
                className="form-control"
                name="water_ml"
                value={form.water_ml}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Brew time (seconds)</label>
              <input
                type="number"
                min="1"
                className="form-control"
                name="brew_time_seconds"
                value={form.brew_time_seconds}
                onChange={handleChange}
              />
            </div>

            <div className="col-12">
              <label className="form-label">Notes</label>
              <textarea
                className="form-control"
                name="notes"
                rows="3"
                value={form.notes}
                onChange={handleChange}
                placeholder="Taste, grind size, recipe notes..."
              />
            </div>
          </div>

          <div className="d-flex gap-2 mt-3">
            <button className="btn btn-dark" type="submit">
              {editingBrew ? "Update Brew" : "Save Brew"}
            </button>

            {editingBrew && (
              <button className="btn btn-outline-secondary" type="button" onClick={onCancel}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
