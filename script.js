// racial breakdown pie chart

Chart.defaults.global.defaultFontFamily = '"Gill Sans",sans-serif';
Chart.defaults.global.defaultFontColor = '#000';
Chart.defaults.global.defaultFontSize = 14;

var ctx = document.getElementById('racePie').getContext('2d');
var chart = new Chart(ctx, {
  // type of chart we want to create
  type: 'pie',

  // data
  data: {
    labels: ['White', 'Black/African American', 'American Indian/Alaskan Native', 'Asian', 'Native Hawaiian/Pacific Islander', 'Other', 'Two or More Races'],
    datasets: [{
      label: 'Population by Race',
      backgroundColor: ['#22585c', '#066d63', '#1d815b', '#4b9247', '#7fa02a', '#bca700', '#ffa600'],
      data: [17.42, 62.01, 0.58, 4.21, 0.07, 11.93, 3.78]
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

/* var ctx = document.getElementById('crimeBar').getContext('2d');
var chart = new Chart(ctx, {
  // type of chart we want to create
  type: 'bar',

  // data
  data: {
    labels: ['1', '2', '3', '4', '5', '6', '7'],
    datasets: [{
      label: 'Types of Crimes',
      backgroundColor: '#066d63',
      data: [7, 6, 5, 4, 3, 2, 1]
    }]
  },

  options: {
    aspectRatio: 1,
    responsive: true,
    layout: {
      padding: 10
    },
    title: {
      display: true,
      text: 'Crime Incidents Sorted by Frequency',
      fontSize: 16
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }

  }
}); */

function processCrimes(list) {
  console.log('fired crime list');
  const range = [...Array(15).keys()];
  const newaray = range.map((item) => {
    const index = getRandomInclusive(0, list.length);
      return list[index];
  });
  return newArray;
} 

/*function initChart(chart, object) {
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
    data: data,
    options: {}
  };

  return new Chart(
    chart,
    config
  );
}
*/
/* function changeChart(chart, dataObject) {
  const labels = Object.keys(dataObject);
  const info = Object.keys(dataObject).map((item) => dataObject[item].length);

  chart.data.labels = labels;
  chart.data.datasets.forEach((set) => {
    set.data = info;
    return set;
  });
  chart.update();
} */

/*function shapeDataForLineChart(array) {
  return array.reduce((collection, item) => {
    if(!collection[item.clearance_code_inc_type]) {
      collection[item.clearance_code_inc_type] = [item];
    } else {
      collection[item.clearance_code_inc_type].push(item);
    }
    return collection;
  }, {});
} */


// map processing

function getRandomIntInclusive(min, max) {
  const newMin = Math.ceil(min);
  const newMax = Math.floor(max);
  return Math.floor(Math.random() * (newMax - newMin + 1) + newMin);
}

function injectHTML(list) {
  console.log('fired injectHTML');
  const target = document.querySelector('#crime_incidents');
  target.innerHTML = '';

  const listEl = document.createElement('ul');
  target.appendChild(listEl);
  list.forEach((item) => {
    const el = document.createElement('li');
    el.innerText = item.clearance_code_inc_type;
    listEl.appendChild(el);
  });
}

function addCrimeIncidents(list) {
  const range = [...Array(10).keys()];
  const newArray = range.map((item) => {
    const index = getRandomIntInclusive(0, list.length);
    return list[index];
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
  const map = L.map('map').setView([38.9897, -76.9378], 11);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);
  return map;
}

//  custom map marker
const blackIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// map marker placement
function markerPlace(array, map) {
  map.eachLayer((layer) => {
    if (layer instanceof L.Marker) {
		  layer.remove();
    }
  });
  array.forEach((item) => {
    const {latitude} = item;
    const {longitude} = item;
    L.marker([latitude, longitude], {icon: blackIcon}).addTo(map);
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
  //const chartTarget = document.querySelector('crimeBar');
  submit.style.display = 'none'; // submit button disappears

  const pageMap = initMap();
  /* api data request */
  const mapData = await getData();
  //const shapedBarData = shapeDataForLineChart(mapData);
  //const barChart = initChart(chartTarget, shapedBarData); 

  if(!mapData?.length > 0) { return; }

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
      //const localData = shapeDataForLineChart(filterList(currentList, event.target.value));
      //changeChart(barChart, localData);
      markerPlace(newFilterList, pageMap);
    });

    form.addEventListener('submit', (submitEvent) => {
      submitEvent.preventDefault();
      currentList = addCrimeIncidents(mapData);
      //secondList = processCrimes(mapData)
      injectHTML(currentList);
      //injectHTML(secondList);
      //const localData = shapeDataForLineChart(secondList);
      //changeChart(barChart, localData);
      markerPlace(currentList, pageMap);
    });
  }
}

document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests