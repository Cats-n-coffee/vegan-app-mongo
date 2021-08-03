# Vegan Spots near you (Miami area only)

Finds vegan food spots in a defined area.<br> 
**THIS APP WORKS ONLY FOR THE FOLLOWING CITIES: MIAMI, HOLLYWOOD, NEW YORK.**

## About

This app uses data stored on MongoDb. The data was pulled from Yelp using this [script](https://github.com/Cats-n-coffee/db_noSQL_1).
**Two options** for the user: enter a city, or use geolocation (**ONLY IF YOU ARE IN MIAMI AREA**).

### First option: enter a city. 

A GET request is sent using user input for a city. Request to the only route /places queries the database with .find() method to return all the matching results and display them on the map.

### Second option: uses the user's location.

This option will only work if used in the city specified above. <br>
The frontend inside the public directory handles getting the user's location (using the Navigator Api), the request is sent with latitude and longitude.<br>

Link to deployed version: https://floating-waters-62278.herokuapp.com/