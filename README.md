Finds vegan food spots in a defined area.

This app uses data stored on MongoDb.

There are two options for the user: enter a city, or use their own location.

First option, enter a city. 
At the moment city options are: Miami, Hollywood, 
The front end fetches the back end using a GET request, and placing userinput as a query parameter. The back end handles the database query with .find() method.

Attempt to do a 'single page' app with api queries on the front end. Back end renders static files only (no views).

Second option uses the user's location to find matching places.

Link to deployed version: https://floating-waters-62278.herokuapp.com/