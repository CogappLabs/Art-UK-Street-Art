// Global variables
let map;
let streetArtLocations = [];
let userLocation = null;

// Calculate distance between two coordinates using Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 3959; // Radius of the Earth in miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in miles
  return distance;
}

// Geocode a postcode or address to get coordinates
function geocodeLocation(locationString, callback) {
  const geocoder = new google.maps.Geocoder();

  geocoder.geocode({ address: locationString }, (results, status) => {
    if (status === "OK" && results[0]) {
      const location = results[0].geometry.location;
      callback({
        lat: location.lat(),
        lng: location.lng(),
      });
    } else {
      alert("Geocoding failed: " + status);
    }
  });
}

// Parse coordinates from string like "51.5074,-0.1278"
function parseCoordinates(coordString) {
  const parts = coordString.split(",");
  if (parts.length === 2) {
    const lat = parseFloat(parts[0].trim());
    const lng = parseFloat(parts[1].trim());
    if (!isNaN(lat) && !isNaN(lng)) {
      return { lat, lng };
    }
  }
  return null;
}

// Find and display nearest street art locations
function findNearestArt(userCoords) {
  userLocation = userCoords;

  // Calculate distances and sort by proximity
  const locationsWithDistance = streetArtLocations
    .map((location) => {
      const distance = calculateDistance(
        userCoords.lat,
        userCoords.lng,
        location.position.lat,
        location.position.lng
      );
      return {
        ...location,
        distance: distance,
      };
    })
    .sort((a, b) => a.distance - b.distance);

  // Display results
  displayResults(locationsWithDistance);

  // Calculate bounds to show all pins including user location
  const bounds = new google.maps.LatLngBounds();

  // Add user location to bounds
  bounds.extend(new google.maps.LatLng(userCoords.lat, userCoords.lng));

  // Add all street art locations to bounds
  streetArtLocations.forEach((location) => {
    bounds.extend(
      new google.maps.LatLng(location.position.lat, location.position.lng)
    );
  });

  // Fit map to show all pins
  map.fitBounds(bounds);

  // Add some padding to the bounds
  const listener = google.maps.event.addListener(map, "idle", function () {
    if (map.getZoom() > 10) {
      map.setZoom(10);
    }
    google.maps.event.removeListener(listener);
  });

  // Add user location marker
  new google.maps.Marker({
    position: userCoords,
    map: map,
    title: "Your Location",
    icon: {
      url:
        "data:image/svg+xml;charset=UTF-8," +
        encodeURIComponent(`
        <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
          <circle cx="15" cy="15" r="12" fill="#3498db" stroke="#2980b9" stroke-width="2"/>
          <circle cx="15" cy="15" r="6" fill="white"/>
        </svg>
      `),
      scaledSize: new google.maps.Size(30, 30),
      anchor: new google.maps.Point(15, 15),
    },
  });
}

// Display search results
function displayResults(locations) {
  const resultsContainer = document.getElementById("results");
  const resultsList = document.querySelector(".results-list");
  const mapElement = document.getElementById("map");

  resultsContainer.style.display = "block";
  resultsList.innerHTML = "";

  locations.forEach((location, index) => {
    const resultItem = document.createElement("li");
    resultItem.className = "result-item";
    resultItem.innerHTML = `
      <button class="result-item__btn">
        <div class="distance">${location.distance.toFixed(1)} miles away</div>
        <h4>${location.title}</h4>
        <div class="artist">Artist: ${location.artist}</div>
        <div class="description">${location.description}</div>
      </button>
    `;

    // Add click handler to centre map on this location
    resultItem.addEventListener("click", () => {
      map.setCenter(location.position);
      map.setZoom(15);
      mapElement.scrollIntoView();
    });

    resultsList.appendChild(resultItem);
  });
}

// Initialise the map when the page loads
function initMap() {
  // Centre the map on the UK (London coordinates)
  const centre = { lat: 51.5074, lng: -0.1278 };

  // Create the map
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 6,
    center: centre,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  });

  // Array of street art locations with their details
  streetArtLocations = [
    {
      position: { lat: 51.5074, lng: -0.1278 },
      title: "Banksy - London",
      description: "Various Banksy pieces around London",
      artist: "Banksy",
      city: "London",
    },
    {
      position: { lat: 53.4808, lng: -2.2426 },
      title: "Northern Quarter - Manchester",
      description: "Vibrant street art scene in Manchester's Northern Quarter",
      artist: "Various Artists",
      city: "Manchester",
    },
    {
      position: { lat: 55.9533, lng: -3.1883 },
      title: "Leith Walk - Edinburgh",
      description: "Colorful murals along Leith Walk",
      artist: "Various Artists",
      city: "Edinburgh",
    },
    {
      position: { lat: 52.4862, lng: -1.8904 },
      title: "Digbeth - Birmingham",
      description: "Street art hub in Birmingham's creative quarter",
      artist: "Various Artists",
      city: "Birmingham",
    },
    {
      position: { lat: 53.8008, lng: -1.5491 },
      title: "Chapel Allerton - Leeds",
      description: "Local street art and murals",
      artist: "Various Artists",
      city: "Leeds",
    },
    {
      position: { lat: 51.4816, lng: -3.1791 },
      title: "Cardiff Bay - Cardiff",
      description: "Welsh street art and murals",
      artist: "Various Artists",
      city: "Cardiff",
    },
  ];

  // Create markers for each location
  streetArtLocations.forEach((location) => {
    const marker = new google.maps.Marker({
      position: location.position,
      map: map,
      title: location.title,
      icon: {
        url:
          "data:image/svg+xml;charset=UTF-8," +
          encodeURIComponent(`
            <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="18" fill="#e74c3c" stroke="#c0392b" stroke-width="2"/>
              <circle cx="20" cy="20" r="8" fill="white"/>
              <text x="20" y="25" text-anchor="middle" font-family="Arial" font-size="12" fill="#e74c3c">🎨</text>
            </svg>
          `),
        scaledSize: new google.maps.Size(40, 40),
        anchor: new google.maps.Point(20, 20),
      },
    });

    // Create info window content
    const infoWindowContent = `
      <div class="info-window">
        <h3>${location.title}</h3>
        <p><strong>Artist:</strong> ${location.artist}</p>
        <p><strong>City:</strong> ${location.city}</p>
        <p>${location.description}</p>
      </div>
    `;

    const infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent,
    });

    // Add click listener to marker
    marker.addListener("click", () => {
      infoWindow.open(map, marker);
    });
  });

  // Add a custom control for the map
  const controlDiv = document.createElement("div");
  controlDiv.innerHTML =
    '<button style="background: white; border: 1px solid #ccc; padding: 10px; cursor: pointer;">Reset View</button>';
  controlDiv.style.padding = "10px";

  google.maps.event.addDomListener(controlDiv, "click", function () {
    map.setCenter(centre);
    map.setZoom(6);
  });

  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(controlDiv);

  // Add search functionality
  setupSearchFunctionality();
}

// Setup search form functionality
function setupSearchFunctionality() {
  const searchButton = document.getElementById("searchButton");
  const locationInput = document.getElementById("locationInput");

  searchButton.addEventListener("click", handleSearch);
  locationInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  });
}

// Handle search form submission
function handleSearch() {
  const locationInput = document.getElementById("locationInput");
  const locationString = locationInput.value.trim();

  if (!locationString) {
    alert("Please enter a postcode or coordinates");
    return;
  }

  // Check if input looks like coordinates (lat,lng format)
  const coords = parseCoordinates(locationString);
  if (coords) {
    findNearestArt(coords);
  } else {
    // Treat as postcode/address and geocode it
    geocodeLocation(locationString, (userCoords) => {
      findNearestArt(userCoords);
    });
  }
}

// Handle any errors with the Google Maps API
window.gm_authFailure = function () {
  alert("Google Maps API authentication failed. Please check your API key.");
};
