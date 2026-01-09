const API_URL = "http://localhost:5000/api/v1/users";

// GET users with pagination
export const getUsers = async (page = 1, limit = 5) => {
  const res = await fetch(`${API_URL}?page=${page}&limit=${limit}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch users");
  return data;
};

// SEARCH users
export const searchUsers = async (term = "", page = 1, limit = 5) => {
  const res = await fetch(
    `${API_URL}/search/${encodeURIComponent(term)}?page=${page}&limit=${limit}`
  );
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to search users");
  return data;
};

// GET stats
export const getStats = async () => {
  const res = await fetch(`${API_URL}/stats`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to get stats");
  return data;
};

// ADD new user
export const addUser = async (data) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const resData = await res.json();
  if (!res.ok) throw new Error(resData.message || "Failed to add user");
  return resData;
};

// UPDATE existing user
export const updateUser = async (id, data) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const resData = await res.json();
  if (!res.ok) throw new Error(resData.message || "Failed to update user");
  return resData;
};

// DELETE user
export const deleteUser = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  const resData = await res.json();
  if (!res.ok) throw new Error(resData.message || "Failed to delete user");
  return resData;
};
