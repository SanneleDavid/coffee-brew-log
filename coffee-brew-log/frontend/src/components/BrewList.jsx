export default function BrewList({ brews, onEdit, onDelete }) {
  if (brews.length === 0) {
    return (
      <div className="text-center py-5 bg-white rounded shadow-sm">
        <h3 className="h5">No brews found</h3>
        <p className="text-muted mb-0">Log your first brew to get started.</p>
      </div>
    );
  }

  return (
    <div className="row g-3">
      {brews.map((brew) => (
        <div className="col-md-6 col-lg-4" key={brew.id}>
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start gap-2">
                <h3 className="h5">{brew.coffee_name}</h3>
                <span className="badge text-bg-dark">{brew.brew_method}</span>
              </div>

              <hr />

              <div className="small text-muted">
                <p className="mb-1"><strong>Dose:</strong> {brew.dose_grams} g</p>
                <p className="mb-1"><strong>Water:</strong> {brew.water_ml} ml</p>
                <p className="mb-2"><strong>Time:</strong> {brew.brew_time_seconds} sec</p>
              </div>

              <p className="mb-3">{brew.notes}</p>

              <div className="d-flex gap-2">
                <button className="btn btn-outline-dark btn-sm" onClick={() => onEdit(brew)}>
                  Edit
                </button>
                <button className="btn btn-outline-danger btn-sm" onClick={() => onDelete(brew.id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
