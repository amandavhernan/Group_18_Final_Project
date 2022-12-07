// racial breakdown pie chart

Chart.defaults.global.defaultFontFamily='"Gill Sans",sans-serif';
Chart.defaults.global.defaultFontColor="#000";
Chart.defaults.global.defaultFontSize = 14;

var ctx = document.getElementById('racePie').getContext('2d');
var chart = new Chart(ctx, {
  // type of chart we want to create
  type: 'pie',

  // data
  data: {
      labels: ["White", "Black/African American", "American Indian/Alaskan Native", "Asian", "Native Hawaiian/Pacific Islander", "Other", "Two or More Races"],
      datasets: [{
          label: "Population by Race",
          backgroundColor: ["#294557", "#005a6d", "#007074", "#00846b", "#289652", "#70a32f", "#ffa600"],
          data: [17.42, 62.01, 0.58, 4.21, 0.07, 11.93, 3.78],
      }]
  },

  // configuration options go here
  options: {
      aspectRatio: 1,
      responsive: true,
      layout: {
          padding: 10
      },
      title: {
        display: true,
        text: 'Population by Race (%)',
        fontSize: 16
      }
  }
});

// crime type bar chart



/* function initChart(chart, object) {
  const labels = Object.keys(object);
  const info = Object.keys(object).map((item) => object[item].length);

  const data = {
    labels: labels
      datasets: [{
          label: "Crime by Type",
          backgroundColor: ["#22585c", "#066d63", "#1d815b", "#4b9247", "#7fa02a", "#bca700", "#ffa600"],
          data: info
      }]
  };

  const config = {
    type: 'bar',
    data: data
    options: {
      aspectRatio: 1,
      responsive: true,
      layout: {
          padding: 10
      },
    }
  },

  return new Chart(
    chart,
    config
  ),
}

function changeChart(chart, dataObject) {
  const labels = Object.keys(dataObject);
  const info = Object.keys(dataObject).map((item) => dataObject[item].length);

  chart.data.labels = labels;
  chart.data.datasets.forEach((set) => {
    set.data = info;
    return set;
  });
  chart.update();
}
*/

// map processing

function injectHTML(list) {
  console.log('fired injectHTML');
  const target = document.querySelector('#crime_incidents');
  target.innerHTML = '';

  const listEl = document.createElement('ol');
  target.appendChild(listEl);
  list.forEach((item) => {
    const el = document.createElement('li');
    el.innerText = item.clearance_code_inc_type;
    listEl.appendChild(el);
  });
}

function addCrimeIncidents(list) {
    const newArray = list.filter((item) => {
      const crimeType = item.clearance_code_inc_type;
        console.log(crimeType);
        return crimeType;
    });
    return newArray;
  }

  function filterList(array, filterInputValue) {
    return array.filter((item) => {
      const lowerCaseName = item.clearance_code_inc_type.toLowerCase();
      const lowerCaseQuery = filterInputValue.toLowerCase();
      return lowerCaseName.includes(lowerCaseQuery);
    });
  }

function initMap() {
  console.log('initMap');
  const map = L.map('map').setView([38.8780, -76.8317], 9);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);
  return map;
}

//  custom map marker #1
// https://github.com/pointhi/leaflet-color-markers
const blackMarker = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

//  custom map markers
// https://apidocs.geoapify.com/samples/markers/leaflet-custom-marker/

// #294557 = assault
const policeMarker1 = L.icon({
    iconUrl: 'https://api.geoapify.com/v1/icon/?type=material&color=%23294557&icon=local_police&noWhiteCircle&scaleFactor=2&apiKey=a16effabd94548a18edff66a4b5d7265',
    iconSize: [25, 41], // size of the icon
    iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
    popupAnchor: [1, -34] // point from which the popup should open relative to the iconAnchor
  });
// #005a6d = assault w/ weapon
const policeMarker2 = L.icon({
    iconUrl: 'https://api.geoapify.com/v1/icon/?type=material&color=%23005a6d&icon=local_police&noWhiteCircle&scaleFactor=2&apiKey=a16effabd94548a18edff66a4b5d7265',
    iconSize: [25, 41], // size of the icon
    iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
    popupAnchor: [1, -34] // point from which the popup should open relative to the iconAnchor
  });
// #007074 = assault, shooting
const policeMarker3 = L.icon({
  iconUrl: 'https://api.geoapify.com/v1/icon/?type=material&color=%23007074&icon=local_police&noWhiteCircle&scaleFactor=2&apiKey=a16effabd94548a18edff66a4b5d7265',
  iconSize: [25, 41], // size of the icon
  iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
  popupAnchor: [1, -34] // point from which the popup should open relative to the iconAnchor
});
// #00846b = robbery (residential, commerical, vehicle, other)
const policeMarker4 = L.icon({
  iconUrl: 'https://api.geoapify.com/v1/icon/?type=material&color=%2300846b&icon=local_police&noWhiteCircle&scaleFactor=2&apiKey=a16effabd94548a18edff66a4b5d7265',
  iconSize: [25, 41], // size of the icon
  iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
  popupAnchor: [1, -34] // point from which the popup should open relative to the iconAnchor
});
// #289652 = homicide
const policeMarker5 = L.icon({
  iconUrl: 'https://api.geoapify.com/v1/icon/?type=material&color=%23289652&icon=local_police&noWhiteCircle&scaleFactor=2&apiKey=a16effabd94548a18edff66a4b5d7265',
  iconSize: [25, 41], // size of the icon
  iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
  popupAnchor: [1, -34] // point from which the popup should open relative to the iconAnchor
});
// #70a32f = sex offense
const policeMarker6 = L.icon({
  iconUrl: 'https://api.geoapify.com/v1/icon/?type=material&color=%2370a32f&icon=local_police&noWhiteCircle&scaleFactor=2&apiKey=a16effabd94548a18edff66a4b5d7265',
  iconSize: [25, 41], // size of the icon
  iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
  popupAnchor: [1, -34] // point from which the popup should open relative to the iconAnchor
});
// #b5aa00 = accident
const policeMarker7 = L.icon({
  iconUrl: 'https://api.geoapify.com/v1/icon/?type=material&color=%23b5aa00&icon=local_police&noWhiteCircle&scaleFactor=2&apiKey=a16effabd94548a18edff66a4b5d7265',
  iconSize: [25, 41], // size of the icon
  iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
  popupAnchor: [1, -34] // point from which the popup should open relative to the iconAnchor
});
// #ffa600 = accident with impound
const policeMarker8 = L.icon({
  iconUrl: 'https://api.geoapify.com/v1/icon/?type=material&color=%23ffa600&icon=local_police&noWhiteCircle&scaleFactor=2&apiKey=a16effabd94548a18edff66a4b5d7265',
  iconSize: [25, 41], // size of the icon
  iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
  popupAnchor: [1, -34] // point from which the popup should open relative to the iconAnchor
});
// #60784a = theft, theft from auto
const policeMarker9 = L.icon({
  iconUrl: 'https://api.geoapify.com/v1/icon/?type=material&color=%2360784a&icon=local_police&noWhiteCircle&scaleFactor=2&apiKey=a16effabd94548a18edff66a4b5d7265',
  iconSize: [25, 41], // size of the icon
  iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
  popupAnchor: [1, -34] // point from which the popup should open relative to the iconAnchor
});
// #3c5f40 = auto, stolen or auto, stolen and recovered
const policeMarker10 = L.icon({
  iconUrl: 'https://api.geoapify.com/v1/icon/?type=material&color=%233c5f40&icon=local_police&noWhiteCircle&scaleFactor=2&apiKey=a16effabd94548a18edff66a4b5d7265',
  iconSize: [25, 41], // size of the icon
  iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
  popupAnchor: [1, -34] // point from which the popup should open relative to the iconAnchor
});
// #0d4e2d = breaking and entering (residential, commericial, vacant, school)
const policeMarker11 = L.icon({
  iconUrl: 'https://api.geoapify.com/v1/icon/?type=material&color=%230d4e2d&icon=local_police&noWhiteCircle&scaleFactor=2&apiKey=a16effabd94548a18edff66a4b5d7265',
  iconSize: [25, 41], // size of the icon
  iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
  popupAnchor: [1, -34] // point from which the popup should open relative to the iconAnchor
});
// #a87128 = vandalism
const policeMarker12 = L.icon({
  iconUrl: 'https://api.geoapify.com/v1/icon/?type=material&color=%23a87128&icon=local_police&noWhiteCircle&scaleFactor=2&apiKey=a16effabd94548a18edff66a4b5d7265',
  iconSize: [25, 41], // size of the icon
  iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
  popupAnchor: [1, -34] // point from which the popup should open relative to the iconAnchor
});

// map marker placement
function markerPlace(array, map) {
  map.eachLayer((layer) => {
		if (layer instanceof L.Marker) {
		  layer.remove();
		}});
  array.forEach((item) => {
    const latitude = item.latitude;
    const longitude = item.longitude;
    const markerPopup = L.popup().innerText = item["clearance_code_inc_type"] + " | " + item["street_address"] + " | PGPD BEAT: " + item["pgpd_beat"];
        // if statement to color code markers by crime type
        if (item.clearance_code_inc_type === 'ASSAULT'){
            L.marker([latitude, longitude], {icon: policeMarker1}).bindPopup(markerPopup).addTo(map);

        } else if (item.clearance_code_inc_type === 'ASSAULT, WEAPON'){
          L.marker([latitude, longitude], {icon: policeMarker2}).bindPopup(markerPopup).addTo(map);

        } else if (item.clearance_code_inc_type === 'ASSAULT, SHOOTING'){
          L.marker([latitude, longitude], {icon: policeMarker3}).bindPopup(markerPopup).addTo(map);

        } else if (item.clearance_code_inc_type === "ROBBERY, RESIDENTIAL" || item.clearance_code_inc_type === "ROBBERY, COMMERCIAL" || item.clearance_code_inc_type === "ROBBERY, VEHICLE" || item.clearance_code_inc_type === "ROBBERY, OTHER") {
          L.marker([latitude, longitude], {icon: policeMarker4}).bindPopup(markerPopup).addTo(map);

        } else if (item.clearance_code_inc_type === 'HOMICIDE'){
          L.marker([latitude, longitude], {icon:policeMarker5}).bindPopup(markerPopup).addTo(map);

        } else if (item.clearance_code_inc_type === 'SEX OFFENSE'){
          L.marker([latitude, longitude], {icon:policeMarker6}).bindPopup(markerPopup).addTo(map);

        } else if (item.clearance_code_inc_type === 'ACCIDENT'){
          L.marker([latitude, longitude], {icon:policeMarker7}).bindPopup(markerPopup).addTo(map);

        } else if (item.clearance_code_inc_type === 'ACCIDENT WITH IMPOUND'){
          L.marker([latitude, longitude], {icon:policeMarker8}).bindPopup(markerPopup).addTo(map);

        } else if (item.clearance_code_inc_type === 'THEFT' || item.clearance_code_inc_type === 'THEFT FROM AUTO'){
          L.marker([latitude, longitude], {icon:policeMarker9}).bindPopup(markerPopup).addTo(map);

        } else if (item.clearance_code_inc_type === 'AUTO, STOLEN' || item.clearance_code_inc_type === 'AUTO, STOLEN & RECOVERED'){
          L.marker([latitude, longitude], {icon:policeMarker10}).bindPopup(markerPopup).addTo(map);

        } else if (item.clearance_code_inc_type === 'B & E, RESIDENTIAL' || item.clearance_code_inc_type === 'B & E, COMMERCIAL' || item.clearance_code_inc_type === 'B & E, VACANT' || item.clearance_code_inc_type === 'B & E, SCHOOL'){
          L.marker([latitude, longitude], {icon:policeMarker11}).bindPopup(markerPopup).addTo(map);

        } else if (item.clearance_code_inc_type === 'VANDALISM'){
          L.marker([latitude, longitude], {icon:policeMarker11}).bindPopup(markerPopup).addTo(map);
        }
  });
}

// grabs api data from pg data portal
async function getData() {
  const url = 'https://data.princegeorgescountymd.gov/resource/wb4e-w4nf.json';
  const data = await fetch(url);
  const json = await data.json();
  const reply = json.filter((item) => Boolean(item.location)).filter((item) => Boolean(item.clearance_code_inc_type));
  return reply;
}

async function mainEvent() {
  // the async keyword means we can make API requests
  const form = document.querySelector('.main_form'); // main form
  const submit = document.querySelector('#get-crime'); // reference to your submit button
  const loadAnimation = document.querySelector('.lds-ellipsis');
  submit.style.display = 'none'; // submit button disappears

  const pageMap = initMap();
  /* api data request */
  const mapData = await getData();

  console.table(mapData);

  console.log(mapData[0]);

  // this is called "string interpolation" and is how we build large text blocks with variables
  console.log(`${mapData[0].clearance_code_inc_type} ${mapData[0].street_address}`);

  // this if statement ensures we can't do anything if we don't have information yet
  if (mapData.length > 0) { 
    submit.style.display = 'block'; 

    loadAnimation.classList.remove('lds-ellipsis');
    loadAnimation.classList.add('lds-ellipsis_hidden');

    let currentList = [];
    form.addEventListener('input', (event) => {
      console.log(event.target.value);
      const newFilterList = filterList(currentList, event.target.value);
      injectHTML(newFilterList);
      markerPlace(newFilterList, pageMap);
    });

    form.addEventListener('submit', (submitEvent) => {
      submitEvent.preventDefault();
      currentList = addCrimeIncidents(mapData);
      injectHTML(currentList);
      markerPlace(currentList, pageMap);
    });
  }
}

document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests