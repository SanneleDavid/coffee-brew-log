import { useEffect, useState } from "react";
import { createBrew, deleteBrew, getBrews, updateBrew } from "./api";
import BrewForm from "./components/BrewForm";
import BrewList from "./components/BrewList";

function App() {
  const [brews, setBrews] = useState([]);
  const [brewCount, setBrewCount] = useState(0);
  const [filter, setFilter] = useState("");
  const [editingBrew, setEditingBrew] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadBrews = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getBrews(filter);
      setBrews(data.brews);
      setBrewCount(data.count);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBrews();
  }, [filter]);

  const handleSave = async (brew) => {
    if (editingBrew) {
      await updateBrew(editingBrew.id, brew);
      setEditingBrew(null);
    } else {
      await createBrew(brew);
    }
    await loadBrews();
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this brew?");
    if (!confirmed) return;

    try {
      await deleteBrew(id);
      if (editingBrew?.id === id) setEditingBrew(null);
      await loadBrews();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-vh-100">
      <header className="hero-section">
        <div className="container py-5">
          <p className="text-uppercase small fw-bold mb-2">Micro-Roastery</p>
          <h1 className="display-5 fw-bold">Brews: {brewCount}</h1>
          <p className="lead mb-0">Keep track of every cup and perfect your recipe.</p>
        </div>
      </header>

      <main className="container py-4">
        <BrewForm
          editingBrew={editingBrew}
          onSave={handleSave}
          onCancel={() => setEditingBrew(null)}
        />

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-3">
          <div>
            <h2 className="h4 mb-1">Brew Log</h2>
            <p className="text-muted mb-0">Your latest brews.</p>
          </div>

          <div className="d-flex align-items-center gap-2">
            <label className="fw-semibold" htmlFor="method-filter">Filter:</label>
            <select
              id="method-filter"
              className="form-select"
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
            >
              <option value="">All methods</option>
              <option value="Pour Over">Pour Over</option>
              <option value="French Press">French Press</option>
              <option value="AeroPress">AeroPress</option>
              <option value="Espresso">Espresso</option>
              <option value="Cold Brew">Cold Brew</option>
            </select>
          </div>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        {loading ? (
          <div className="text-center py-5">Loading brews...</div>
        ) : (
          <BrewList
            brews={brews}
            onEdit={setEditingBrew}
            onDelete={handleDelete}
          />
        )}
      </main>
    </div>
  );
}

export default App;
