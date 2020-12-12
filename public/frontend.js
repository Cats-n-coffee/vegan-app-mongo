const myData = document.getElementById('my-data');
const submitForm = document.getElementById('form-city');
const userInput = document.getElementById('user-input');
const geolocationBtn = document.getElementById('geolocation-btn');
const inputBtn = document.getElementById('input-button');
const mapContainer = document.getElementById('map-container');
const mainContent = document.getElementsByClassName('main-content')[0];
const mainContainer = document.getElementById('main-container');
const headerBar = document.getElementsByTagName('header')[0];
const footerBar = document.getElementsByTagName('footer')[0];

document.addEventListener('DOMContentLoaded', () => {
    mainContainer.classList.add('home-page-right');
    headerBar.classList.add('home-page-form');
    footerBar.classList.add('home-page-footer');
    // inputBtn.addEventListener('click', () => {
    //     headerBar.style.transform = 'translateY(-25%)';
    // })
})


// get user input(city) and query database
submitForm.addEventListener('submit', findPlacesByCity)
function findPlacesByCity(e) {
    e.preventDefault();
    
    mainContainer.classList.remove('home-page-right');
    headerBar.classList.remove('home-page-form');
    footerBar.classList.remove('home-page-footer');
    
    clearDisplay();
    var city = userInput.value;
    if (city.match(/^[A-Za-z]+$/)){
        city = city.toLowerCase();
        city = city.split(' ');
        for (let i=0; i < city.length; i++) {
        city[i] = city[i].charAt(0).toUpperCase() + city[i].substring(1);
        }
        city = city.join(' ');
        
    }
    else {
        const errorDiv = document.createElement('span');
        errorDiv.innerText = 'Sorry we couldn\'t find any match to your request';
        myData.appendChild(errorDiv);
        userInput.value = '';
        return
    }
    
    console.log(city);
    fetchApi('/api/places?city=' + city)
}

// get user location(coordinates)
geolocationBtn.addEventListener('click', getUserLocation)
function getUserLocation() {
    clearDisplay();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position){
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const latLon = lat + ',' + lon;
            console.log(lat,lon);
            //getUserZipCode(latLon);
            const strlat = lat.toString();
            const strlng = lon.toString();
            console.log(typeof strlng)
            fetchApi('/api/places?lat=' + strlat + '&lng=' + strlng)
        });
    }
    mainContainer.classList.remove('home-page-right');
    headerBar.classList.remove('home-page-form');
    footerBar.classList.remove('home-page-footer');
} 

// queries the database, then uses response data to invoke two other functions
async function fetchApi(url) {
    console.log(url)
    clearDisplay();
    await fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            getLocationsCoordinates(data)
            displayData(data)
        })
        .catch(err => console.log(err));
}

// uses each location's coordinates from json response, places them in an array, and prepares the format for api call
function getLocationsCoordinates(data) {
    var arrayOfCoordinates = [];
    if (data.length === 0){
        return
    } else {
        for (let i = 0; i < data.length; i++){
            var place = data[i];
            var placeLat = place.coordinates.latitude;
            var placeLon = place.coordinates.longitude;
            var marker = 'marker-sm-' + (i+1);
            var placeLatLon = placeLat + ',' + placeLon + '|' + marker + '||';
            arrayOfCoordinates.push(placeLatLon)
        }
        var allCoordinates = arrayOfCoordinates.join('');
        allCoordinates = allCoordinates.substring(0, allCoordinates.length-2);
        placeLocationsOnMap(allCoordinates)
    }
}

// GET request to place each location on a map
function placeLocationsOnMap(allCoordinates) {
    const newRequest = new XMLHttpRequest;
    newRequest.open('GET', 'https://www.mapquestapi.com/staticmap/v5/map?locations=' + allCoordinates+ '&zoom=12&size=600,400@2x&key=AxTAT4irkRbwuBj9vGdoAGdRDCVF6D0z&declutter=true', true);
    newRequest.responseType = 'blob';
    newRequest.onload = function(e){
        if(this.status === 200) {
            const blob = this.response;
            mapContainer.onload = function(e){
                window.URL.revokeObjectURL(mapContainer.src);
            };
            mapContainer.src = window.URL.createObjectURL(blob);
        }
        
    }
    newRequest.send();
}

// displays each location's name on the screen
function displayData(responseJson) {
    console.log(responseJson)
    userInput.value = '';
    for (let i = 0; i < responseJson.length; i++) {
        var name = responseJson[i].name;
        var address1 = responseJson[i].location.display_address[0];
        var address2 = responseJson[i].location.display_address[1];
        var phone = responseJson[i].display_phone;
        var newDiv = document.createElement('div');
        var nameSpan = document.createElement('span');
        nameSpan.innerText = (i+1) + '- ' + name;
        newDiv.appendChild(nameSpan);
        var addressSpan = document.createElement('span');
        addressSpan.innerText = address1 + ' ' + address2;
        newDiv.appendChild(addressSpan);
        var phoneSpan = document.createElement('span');
        phoneSpan.innerText = phone;
        newDiv.appendChild(phoneSpan);
        myData.appendChild(newDiv);
    }
};

// clears the display 
function clearDisplay() {
    while (myData.firstChild) {
        myData.removeChild(myData.firstChild);
    }
}

