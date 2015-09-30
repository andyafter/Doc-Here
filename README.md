# Clinic Pathfinding Application

The application was meant to help people find the nearest clinic around them, and let them queue and choose doctors from the clinic. My system contains a clinic android application, a client application, clinic database storage and a clinic information backend system. The heroku folder contains the backend system and database(model and database file). In the Hospitella folder there is the client side application. In the HospitalSide there is the hospital side app. Considering the fact that this project is meant for the exploration of the performance ofthe combination of ionic, AngularJS and Cordova on the Android platform. The applications showed in these several projects are pretty simple.

## Technologies Used

Hospitella and HospitalSide application are made with AngularJS(ionic). With Cordova we can put pure HTML into applications onto both platforms of Android and iOS. 

For the backend system Python Flask was selected as the web framework for the development. Together with SQLAlchemy we can combine it with a simple SQLite3 database. 

In summarize:
- AngularJS(Ionic)
- Python Flask
- SQLAlchemy
- SQLite3

## Clinic Side Application

The clinic side application is called Hospitella. The functionalities of Hospitella contains:
- Show the clinics around a user
- Locate the user on the map with a marker
- Show driving route when user click on the hospital
- Show information about the hospital when user click on the hospital mark
- Let user queue for the hospital with a button in the hospital infowindow
- User can queue for a clinic with his IC number
- User can search specific location with the search bar
- User can search the route between the place he searched and a clinic

## Hospital Side

Hospital side application is more likely to be about clinic information creation, retrieving, updating and deletion. 

The hospital side application contains the following features:
- Hospital creation. User should provide a hospital name and address(at least line 1)
- Search for a clinic
- Auto completion when user search for a clinic
- A card contains information about the hospital will be shown to the user after the information isn queried from database
- Clinic information updating with double clicking the card
- Clinic deletion with long press

## Backend and Database

The backend is built with python flask. With SQLAlchemy modeling the database schema is also mapped to python models. 
The database schema is contained in the database.py file. 

Backend system contains functions that can provide the following services for the front end system:
- Clinic information CRUD
- Query all clinic information
- Patient, Queue, Doctor information CRUD
- Insurance information management
- Queue
- Patient registration

The database schema is shown in the following picture:
![alt tag](https://github.com/andyafter/Doc-Here/master/1.jpg)
