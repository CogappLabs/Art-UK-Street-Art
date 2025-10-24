// Global variables
let map;
let streetArtLocations = [];
let userLocation = null;

// Fallback data in case JSON fetch fails
const fallbackLocations = [
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

// Fetch street art locations from JSON file
async function fetchStreetArtLocations() {
  try {
    const response = await fetch("street-art-locations.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.locations;
  } catch (error) {
    console.warn("Failed to fetch street art locations from JSON file:", error);
    console.log("Using fallback data instead");
    return fallbackLocations;
  }
}

// Alternative: Load JSON data directly (works without server)
function loadStreetArtLocationsDirectly() {
  // This will work on GitHub Pages and local file:// URLs
  return [
    {
      _index: "art_uk_street_art_locations",
      _id: "635162",
      _score: 1,
      artwork_id: "635162",
      artwork_title: "Abstract Face in Red Surround",
      additional_title_info: null,
      collection_accession_number: "CF23_MRF_S1212",
      pcf_number: "CF23_MRF_S1212",
      acquisition_method:
        "created for the artist-led community project Whispering Walls",
      execution_date: "2022",
      medium: "paint",
      type: "Painted",
      inscription: null,
      inscription_signature: null,
      display_fields: "Pawson, Alex, b.1988 | CF23_MRF_S1212",
      tags: "Street Art",
      address_lat: 51.501086,
      address_long: -3.1752437,
      location_point: {
        lat: 51.501086,
        lon: -3.1752437,
      },
      art_uk_image:
        "https://d3d00swyhr67nd.cloudfront.net/w250/collection/PUBSCULPT/CF23/CF23_MRF_S1212-001.jpg",
      art_uk_label: "View artwork",
      art_uk_api_url:
        "https://artuk.org/api/venues/object/coordinates/51d5010860c-3d1752437",
      art_uk_api_title: "Abstract Face in Red Surround",
      art_uk_link:
        "https://artuk.org/discover/artworks/abstract-face-in-red-surround-635162",
      art_uk_image_url:
        "https://d3d00swyhr67nd.cloudfront.net/w250/collection/PUBSCULPT/CF23/CF23_MRF_S1212-001.jpg",
    },
    {
      _index: "art_uk_street_art_locations",
      _id: "635148",
      _score: 1,
      artwork_id: "635148",
      artwork_title: "Abstract Faces",
      additional_title_info: null,
      collection_accession_number: "BS3_PF_S1251",
      pcf_number: "BS3_PF_S1251",
      acquisition_method: null,
      execution_date: "2024",
      medium: "paint",
      type: "Painted",
      inscription: null,
      inscription_signature: null,
      display_fields: "Squirl, active since early 2010s | BS3_PF_S1251",
      tags: "Abstract, Pictorial, Street Art",
      address_lat: 51.43593,
      address_long: -2.5950667,
      location_point: {
        lat: 51.43593,
        lon: -2.5950667,
      },
      art_uk_image_url:
        "https://d3d00swyhr67nd.cloudfront.net/w250/collection/PUBSCULPT/BS3/BS3_PF_S1251-015.jpg",
      art_uk_label: "View artwork",
      art_uk_api_url:
        "https://artuk.org/api/venues/object/coordinates/51d435930c-2d5950667",
      art_uk_link: "https://artuk.org/discover/artworks/abstract-faces-635148",
    },
    {
      _index: "art_uk_street_art_locations",
      _id: "638195",
      _score: 1,
      artwork_id: "638195",
      artwork_title: "Abstract",
      additional_title_info: null,
      collection_accession_number: "L1_MJR_S1325",
      pcf_number: "L1_MJR_S1325",
      acquisition_method: "created for Contrast Mural Festival, 2018",
      execution_date: "2018",
      medium: "paint",
      type: "Painted",
      inscription: null,
      inscription_signature: null,
      display_fields: "Ekto, Stevie | L1_MJR_S1325",
      tags: "Street Art",
      address_lat: 53.4808,
      address_long: -2.2426,
      location_point: {
        lat: 53.4808,
        lon: -2.2426,
      },
    },
    {
      _index: "art_uk_street_art_locations",
      _id: "638283",
      _score: 1,
      artwork_id: "638283",
      artwork_title: "Cotton Plant",
      additional_title_info: null,
      collection_accession_number: "L3_MJR_S1249",
      pcf_number: "L3_MJR_S1249",
      acquisition_method: null,
      execution_date: "2019",
      medium: "paint",
      type: "Painted",
      inscription: null,
      inscription_signature: null,
      display_fields: "Hicks, Jo | L3_MJR_S1249",
      tags: "Natural, Non-figurative, Street Art",
      address_lat: 55.9533,
      address_long: -3.1883,
      location_point: {
        lat: 55.9533,
        lon: -3.1883,
      },
    },
    {
      _index: "art_uk_street_art_locations",
      _id: "416464",
      _score: 1,
      artwork_id: "416464",
      artwork_title: "DBA Crew",
      additional_title_info: null,
      collection_accession_number: "G3_GB_S8115",
      pcf_number: "G3_GB_S8115",
      acquisition_method: "commissioned by Network Rail through Yardworks",
      execution_date: "2023",
      medium: "paint",
      type: "Painted",
      inscription: null,
      inscription_signature: null,
      display_fields:
        "Don't Be Alarmed, active since 2020 | Yardworks | G3_GB_S8115",
      tags: "Pictorial, Street Art",
      address_lat: 55.863353,
      address_long: -4.2972066,
      location_point: {
        lat: 55.863353,
        lon: -4.2972066,
      },
    },
  ];
}

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

  // Calculate distances and sort by proximity (only for locations with coordinates)
  const locationsWithDistance = streetArtLocations
    .filter((location) => {
      const locationSrc = location._source || location;
      return locationSrc.address_lat && locationSrc.address_long;
    })
    .map((location) => {
      const locationSrc = location._source || location; // Handle both formats
      const distance = calculateDistance(
        userCoords.lat,
        userCoords.lng,
        locationSrc.address_lat,
        locationSrc.address_long
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

  // Add all street art locations to bounds (only if coordinates exist)
  streetArtLocations
    .filter((location) => {
      const locationSrc = location._source || location;
      return locationSrc.address_lat && locationSrc.address_long;
    })
    .forEach((location) => {
      const locationSrc = location._source || location; // Handle both formats
      bounds.extend(
        new google.maps.LatLng(
          locationSrc.address_lat,
          locationSrc.address_long
        )
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
    const locationSrc = location._source || location;
    const resultItem = document.createElement("li");
    resultItem.className = "result-item";
    resultItem.innerHTML = `
      <button class="result-item__btn">
        <div class="distance">${location.distance.toFixed(1)} miles away</div>
        <h4>${locationSrc.artwork_title}</h4>
        <div class="artist">Artist: ${locationSrc.display_fields}</div>
        <div class="medium">${locationSrc.medium}</div>
        <div class="year">${locationSrc.execution_date}</div>
      </button>
    `;

    // Add click handler to centre map on this location
    resultItem.addEventListener("click", () => {
      const position = {
        lat: locationSrc.address_lat,
        lng: locationSrc.address_long,
      };
      map.setCenter(position);
      map.setZoom(15);
      mapElement.scrollIntoView();
    });

    resultsList.appendChild(resultItem);
  });
}

// Initialise the map when the page loads
async function initMap() {
  // Centre the map on the UK (London coordinates)
  const centre = { lat: 51.5074, lng: -0.1278 };

  // Create the map
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 6,
    center: centre,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  });

  // Load street art locations (works on GitHub Pages and local development)
  try {
    streetArtLocations = await fetchStreetArtLocations();
  } catch (error) {
    // Fallback to direct loading for GitHub Pages compatibility
    streetArtLocations = loadStreetArtLocationsDirectly();
  }

  // Group locations by coordinates to handle clustering
  const locationsByCoordinates = {};

  streetArtLocations
    .filter((location) => {
      const locationSrc = location._source || location;
      return locationSrc.address_lat && locationSrc.address_long;
    })
    .forEach((location) => {
      const locationSrc = location._source || location;
      const coordKey = `${locationSrc.address_lat},${locationSrc.address_long}`;

      if (!locationsByCoordinates[coordKey]) {
        locationsByCoordinates[coordKey] = [];
      }
      locationsByCoordinates[coordKey].push(location);
    });

  // Create markers for each coordinate group
  Object.values(locationsByCoordinates).forEach((locations) => {
    const firstLocation = locations[0];
    const locationSrc = firstLocation._source || firstLocation;
    const isMultiple = locations.length > 1;

    const marker = new google.maps.Marker({
      position: {
        lat: locationSrc.address_lat,
        lng: locationSrc.address_long,
      },
      map: map,
      title: isMultiple
        ? `${locations.length} artworks at this location`
        : locationSrc.artwork_title,
      icon: {
        url:
          "data:image/svg+xml;charset=UTF-8," +
          encodeURIComponent(`
          <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="18" fill="#e74c3c" stroke="#c0392b" stroke-width="2"/>
            <circle cx="20" cy="20" r="8" fill="white"/>
            <text x="20" y="25" text-anchor="middle" font-family="Arial" font-size="12" fill="#e74c3c">🎨</text>
            ${
              isMultiple
                ? `<text x="20" y="10" text-anchor="middle" font-family="Arial" font-size="10" fill="white" font-weight="bold">${locations.length}</text>`
                : ""
            }
          </svg>
        `),
        scaledSize: new google.maps.Size(40, 40),
        anchor: new google.maps.Point(20, 20),
      },
    });

    // Create info window content for all locations at this coordinate (sometimes can be multiple)
    let infoWindowContent;
    if (isMultiple) {
      infoWindowContent = `
        <div class="info-window">
          <h3>${locations.length} Artworks at this Location</h3>
          ${locations
            .map((loc, index) => {
              const locSrc = loc._source || loc;
              return `
              <div style="border-bottom: 1px solid #eee; padding: 10px 0; ${
                index === 0 ? "border-top: 1px solid #eee;" : ""
              }">
                <h4>${locSrc.artwork_title}</h4>
                <p><strong>Artist:</strong> ${locSrc.display_fields}</p>
                <p><strong>Date:</strong> ${locSrc.execution_date}</p>
                ${
                  locSrc.art_uk_image_url
                    ? `<img src="${locSrc.art_uk_image_url}" width="200" style="margin: 5px 0;" />`
                    : ""
                }
                ${
                  locSrc.art_uk_link
                    ? `<a href="${locSrc.art_uk_link}" target="_blank">View on Art UK</a>`
                    : ""
                }
              </div>
            `;
            })
            .join("")}
        </div>
      `;
    } else {
      const singleLocationSrc = firstLocation._source || firstLocation;
      infoWindowContent = `
        <div class="info-window">
          <h3>${singleLocationSrc.artwork_title}</h3>
          <p><strong>Artist:</strong> ${singleLocationSrc.display_fields}</p>
          <p><strong>Date:</strong> ${singleLocationSrc.execution_date}</p>
          ${
            singleLocationSrc.art_uk_image_url
              ? `<img src="${singleLocationSrc.art_uk_image_url}" width="250" />`
              : ""
          }
          ${
            singleLocationSrc.art_uk_link
              ? `<a href="${singleLocationSrc.art_uk_link}" target="_blank">View on Art UK website</a>`
              : ""
          }
        </div>
      `;
    }

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
