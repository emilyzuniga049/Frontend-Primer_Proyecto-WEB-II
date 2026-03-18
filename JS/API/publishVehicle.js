const VEHICLE_API = "http://localhost:3000/api/vehicle";
const USER_API = "http://localhost:3000/api/auth/user";

async function getCurrentUser(token) {
  const response = await fetch(USER_API, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "No se pudo obtener el usuario.");
  }

  return data;
}

async function createVehicle(formData, token) {
  const response = await fetch(VEHICLE_API, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: formData
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || data.message || "No se pudo publicar el vehículo.");
  }

  return data;
}
