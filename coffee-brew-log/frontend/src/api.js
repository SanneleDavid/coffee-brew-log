const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || "Something went wrong.");
  }

  return data;
}

export const getBrews = (method = "") =>
  request(`/brews${method ? `?method=${encodeURIComponent(method)}` : ""}`);

export const createBrew = (brew) =>
  request("/brews", {
    method: "POST",
    body: JSON.stringify(brew),
  });

export const updateBrew = (id, brew) =>
  request(`/brews/${id}`, {
    method: "PUT",
    body: JSON.stringify(brew),
  });

export const deleteBrew = (id) =>
  request(`/brews/${id}`, {
    method: "DELETE",
  });
