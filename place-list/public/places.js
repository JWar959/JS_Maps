// The 'map' parameter is refering to the #map element. 
// We are initializing the map to near Ramapo College - but you can  
// initialize it to anywhere. 

let markers = [];

const map = L.map('map').setView([41, -74], 13); 
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { 
   maxZoom: 19, attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' 
}).addTo(map);

const addPlace = async () => {
    const labelField = document.querySelector("#label");
    const addressField = document.querySelector("#address");

    const label = labelField.value;
    const address = addressField.value;

    labelField.style.color = "transparent";
    addressField.style.color = "transparent";

    await axios.put('/places', { label: label, address: address });
    await loadPlaces();

    // setting a timeout here to deal with timing issues preventing
    // this from being drawn correctly
    setTimeout(() => {
        addressField.style.color = '';
        labelField.value = '';
        addressField.value = '';
        labelField.style.color = '';
    }, 10);
}

const deletePlace = async (id) => {
    await axios.delete(`/places/${id}`);
    await loadPlaces();
}

// Define the function for on_row_click
const on_row_click = (e) => { 
    console.log(e.target)  
    console.log(e.target.tagName)
    
    let row = e.target; 
    

    if (e.target.tagName.toUpperCase() === 'TD') { 
        row = e.target.parentNode;
        
        const lat = row.dataset.lat; 
        const lng = row.dataset.lng;

        map.flyTo(new L.LatLng(lat, lng));
        // Try to get the markers to pop up
        const marker = markers.find(m => m.placeId == row.dataset.id);
        if (marker) marker.openPopup();

    }
}

const loadPlaces = async () => {
    const response = await axios.get('/places');
    const tbody = document.querySelector('tbody');
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }

    if (response && response.data && response.data.places) {
        for (let i = 0; i < markers.length; i++) { 
            map.removeLayer(markers[i]); 
         }
        markers.length = 0;

        for (const place of response.data.places) {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${place.label}</td>
                <td>${place.address}</td>
                <td>
                    <button class='btn btn-danger' onclick='deletePlace(${place.id})'>Delete</button>
                </td>
            `;

            tr.dataset.lat = place.lat; 
            tr.dataset.lng = place.lng;
            // Only enable this feature if it's a real value
            if( ( place.lat !== 0 ) || ( place.lng !== 0 ) ){
                tr.onclick = on_row_click;
            }
            tr.dataset.id = place.id;

            tbody.appendChild(tr);

            // Going to try and avoid marking locations that aren't 'real'
            if ( (place.lat !== 0 ) && ( place.lng !== 0 ) ) {
                const marker = L.marker([place.lat, place.lng])
                    .addTo(map)
                    .bindPopup(`<b>${place.label}</b><br/>${place.address}`);
                marker.placeId = place.id;    
                markers.push(marker); // store marker for later removal
            }           
        }
    }
}