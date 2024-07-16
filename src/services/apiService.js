const BASE_URL = "http://localhost:8080/api";

export async function authUserService(username, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  };

  try {
    const response = await fetch(`${BASE_URL}/auth/login`, requestOptions);
    if (!response.ok) {
      throw new Error("Authentication failed");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error authenticating user:", error);
    throw error;
  }
}

export async function fetchNaviosListService() {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  try {
    const response = await fetch(`${BASE_URL}/navios/listar`, requestOptions);
    if (!response.ok) {
      throw new Error("Failed to fetch navios list");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching navios list:", error);
    throw error;
  }
}

export async function fetchBercosListService() {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  try {
    const response = await fetch(`${BASE_URL}/bercos/listar`, requestOptions);
    if (!response.ok) {
      throw new Error("Failed to fetch berço list");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching berço list:", error);
    throw error;
  }
}

export async function addNavio(newShipData) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newShipData),
  };

  try {
    const response = await fetch(`${BASE_URL}/navios/cadastro`, requestOptions);
    return response;
  } catch (error) {
    console.error("Error adding navio:", error);
    throw error;
  }
}

export async function deleteNavio(navioId) {
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };

  try {
    const response = await fetch(
      `${BASE_URL}/navios/deletar/${navioId}`,
      requestOptions
    );
    return response;
  } catch (error) {
    console.error("Error deleting navio:", error);
    throw error;
  }
}

export async function editNavio(navioId, newData) {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newData),
  };

  try {
    const response = await fetch(
      `${BASE_URL}/navios/editar/${navioId}`,
      requestOptions
    );
    return response;
  } catch (error) {
    console.error("Error editing navio:", error);
    throw error;
  }
}
/* export async function addBerco(newBercoData) {}
export async function editBerco(bercoId, newBercoData) {}
export async function deleteBerco(bercoId) {}
 */
