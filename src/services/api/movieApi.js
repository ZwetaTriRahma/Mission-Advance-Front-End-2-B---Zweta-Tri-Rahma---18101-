const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// ===== FILM TRENDING =====
export const getTrending = async () => {
  const res = await fetch(`${BASE_URL}/filmtrending`);
  return res.json();
};

export const addTrending = async (film) => {
  const res = await fetch(`${BASE_URL}/filmtrending`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(film),
  });
  return res.json();
};

export const updateTrending = async (id, film) => {
  const res = await fetch(`${BASE_URL}/filmtrending/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(film),
  });
  return res.json();
};

export const deleteTrending = async (id) => {
  await fetch(`${BASE_URL}/filmtrending/${id}`, { method: "DELETE" });
};

// ===== RILS BARU =====
export const getRilsBaru = async () => {
  const res = await fetch(`${BASE_URL}/rilsbaru`);
  return res.json();
};

export const addRilsBaru = async (film) => {
  const res = await fetch(`${BASE_URL}/rilsbaru`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(film),
  });
  return res.json();
};

export const updateRilsBaru = async (id, film) => {
  const res = await fetch(`${BASE_URL}/rilsbaru/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(film),
  });
  return res.json();
};

export const deleteRilsBaru = async (id) => {
  await fetch(`${BASE_URL}/rilsbaru/${id}`, { method: "DELETE" });
};