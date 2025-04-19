# Project 4 - Maps with JavaScript

This application allows users to add locations to a shared map and view them with interactive markers and popups using the locations real coordinates.

## Features

- **Interactive Map with Markers**  
  Uses Leaflet to render a dynamic map with custom markers for each location.

- **Server-Side Geocoding**  
  Automatically converts entered addresses into latitude/longitude coordinates using `node-geocoder` with OpenStreetMap as the provider.

- **Database Integration**  
  Locations are stored in a SQLite database, including their label, formatted address, and coordinates.

- **AJAX with Axios**  
  All updates happen without refreshing the page, using `axios` for asynchronous HTTP requests.

- **Responsive Design**  
  Layout stacks vertically on small screens and uses a 50/50 split on medium and larger screens utilizing Bootstrap’s grid system.

- **UI Enhancements**  
  - Automatically flies to the newly added location and opens its marker popup  
  - Prevents flying to invalid coordinates  
  - Clears and resets input fields after submission  
  - Disables row clicks for locations without valid coordinates

## Tools Used

- Node.js + Express
- Leaflet.js
- Bootstrap 5
- Axios
- node-geocoder
- SQLite
- Pug

## Getting Started

1. **Install dependencies**
- npm install

2. **Run the app**
- node index.js

3. **Access the site**
Open your browser to http://localhost:8080

## Notes

- If the geocoder cannot find a valid location, the app handles it by setting that locations latitude and longitude coordinates to 0.

## Author

**John Warren**  
Ramapo College of New Jersey  
CMPS 369 – Web Application Development
Spring 2025  
Instructor: Professor Scott Frees, Ph.D.


