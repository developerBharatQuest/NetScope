

document.getElementById("showInfoBtn").addEventListener("click", () => {
  document.getElementById("dashboard").classList.remove("hidden");
  
  fetch("https://ipinfo.io/json")
    .then(res => res.json())
    .then(data => {
      reflectDOM(data);
      createMap(data);
    })
    .catch(() => {
      document.getElementById("loading").textContent =
        "Unable to detect network information.";
    });
});

function reflectDOM(data) {
  document.getElementById("loading").style.display = "none";
  document.getElementById("info").style.display = "block";
  
  document.getElementById("ip").textContent = data.ip || "N/A";
  document.getElementById("hostname").textContent = data.hostname || "N/A";
  document.getElementById("city").textContent = data.city || "N/A";
  document.getElementById("region").textContent = data.region || "N/A";
  document.getElementById("country").textContent = data.country || "N/A";
  document.getElementById("loc").textContent = data.loc || "N/A";
  document.getElementById("org").textContent = data.org || "N/A";
  document.getElementById("timezone").textContent = data.timezone || "N/A";
}

function createMap(data) {
  if (!data.loc) return;
  const [lat, lon] = data.loc.split(",").map(Number);
  const map = L.map("map").setView([lat, lon], 7);
  
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);
  
  L.marker([lat, lon]).addTo(map)
    .bindPopup(`<b>${data.city}, ${data.region}</b><br>${data.ip}`)
    .openPopup();
  
  L.circle([lat, lon], {
    color: '#3b82f6',
    fillColor: '#3b82f6',
    fillOpacity: 0.2,
    radius: 100000
  }).addTo(map);
}

