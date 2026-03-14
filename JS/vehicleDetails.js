document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("vehicleDetailsContainer");
  const defaultCarImage = "../img/default-car.png";
  const token = sessionStorage.getItem("token");

  loadVehicleDetails();

  async function loadVehicleDetails() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
      showError("No se encontró el vehículo.");
      return;
    }

    try {
      const data = await getVehicleById(id);

      const vehicle = data.vehicle;
      const owner = data.owner;

      showVehicle(vehicle, owner);
    } catch (error) {
      showError(error.message);
    }
  }

  function showError(message) {
    container.innerHTML = `
      <div class="col-span-full text-center py-16">
        <p class="text-red-400 text-lg font-medium">${message}</p>
      </div>
    `;
  }

  function showVehicle(vehicle, owner) {
    let image = defaultCarImage;

    if (vehicle.image_path) {
      image = vehicle.image_path;
    }

    let statusClass = "disponible";

    if (vehicle.status === "Vendido") {
      statusClass = "vendido";
    }

    const ownerSection = buildOwnerSection(owner);

    let actionButtons = `
      <button id="copyLinkBtn"
        class="w-full sm:w-auto px-5 py-3 rounded-xl bg-red-600 hover:bg-red-500 transition font-semibold">
        Copiar enlace
      </button>
    `;

    if (token) {
      actionButtons += `
        <button id="messageBtn"
          class="w-full sm:w-auto px-5 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition font-semibold">
          Enviar mensaje
        </button>
      `;
    }

    const shareUrl = window.location.href;

    container.innerHTML = `
      <section class="detail-card fade-in">
        <img
          src="${image}"
          alt="${vehicle.brand} ${vehicle.model}"
          class="detail-image"
          onerror="this.onerror=null; this.src='${defaultCarImage}'"
        />
      </section>

      <section class="detail-card fade-in p-6 lg:p-8">
        <div class="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h2 class="text-3xl font-bold text-white">${vehicle.brand} ${vehicle.model}</h2>
            <p class="text-zinc-400 mt-2">Información completa del vehículo publicado en TicoAutos</p>
          </div>

          <span class="status-badge ${statusClass}">
            ${vehicle.status || "Disponible"}
          </span>
        </div>

        <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="info-box">
            <p class="label-small">Marca</p>
            <p class="value-strong">${vehicle.brand || "No disponible"}</p>
          </div>

          <div class="info-box">
            <p class="label-small">Modelo</p>
            <p class="value-strong">${vehicle.model || "No disponible"}</p>
          </div>

          <div class="info-box">
            <p class="label-small">Año</p>
            <p class="value-strong">${vehicle.year || "No disponible"}</p>
          </div>

          <div class="info-box">
            <p class="label-small">Precio</p>
            <p class="value-strong">₡${Number(vehicle.price || 0).toLocaleString()}</p>
          </div>

          <div class="info-box sm:col-span-2">
            <p class="label-small">Descripción</p>
            <p class="value-strong">${vehicle.description || "Sin descripción"}</p>
          </div>

          ${ownerSection}
        </div>

        <div class="mt-8">
          <p class="text-sm text-zinc-400 mb-2">Compartir vehículo</p>

          <div class="mt-4 flex flex-col sm:flex-row gap-3">
            ${actionButtons}
          </div>

          <p id="actionMessage" class="text-sm text-zinc-400 mt-3"></p>
        </div>
      </section>
    `;

    copyButton(shareUrl);
    messageButton(vehicle._id);
  }

  function buildOwnerSection(owner) {
    if (!owner) {
      return `
        <div class="info-box sm:col-span-2">
          <p class="label-small">Propietario</p>
          <p class="value-strong">Información no disponible</p>
        </div>
      `;
    }

    // user sin aunticar
    if (!token) {
      return `
        <div class="info-box sm:col-span-2">
          <p class="label-small">Propietario</p>
          <p class="value-strong">${owner.name || ""} ${owner.last_name || ""}</p>
        </div>
      `;
    }

    // user autenticado
    return `
      <div class="info-box">
        <p class="label-small">Nombre</p>
        <p class="value-strong">${owner.name || "No disponible"}</p>
      </div>

      <div class="info-box">
        <p class="label-small">Apellido</p>
        <p class="value-strong">${owner.last_name || "No disponible"}</p>
      </div>

      <div class="info-box">
        <p class="label-small">Correo</p>
        <p class="value-strong">${owner.email || "No disponible"}</p>
      </div>

      <div class="info-box">
        <p class="label-small">Cédula</p>
        <p class="value-strong">${owner.id_number || "No disponible"}</p>
      </div>
    `;
  }

  function copyButton(link) {
    const copyBtn = document.getElementById("copyLinkBtn");
    const actionMessage = document.getElementById("actionMessage");

    if (!copyBtn) {
      return;
    }

    copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(link);
        actionMessage.textContent = "Enlace copiado correctamente.";
      } catch (error) {
        actionMessage.textContent = "No se pudo copiar el enlace.";
      }
    });
  }

  function messageButton(vehicleId) {
    const messageBtn = document.getElementById("messageBtn");
    const actionMessage = document.getElementById("actionMessage");

    if (!messageBtn) {
      return;
    }
  }
});