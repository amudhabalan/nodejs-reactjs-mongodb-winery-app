# A Wine List App written in ReactJs with NodeJs & MongoDB

#### Watch it in action at https://amuds-winery-app.herokuapp.com/

![To Do App](screenshot.jpg)

## Installation
* Pull down the repository to your local machine.
* Run `npm install` on the main folder. Go to client folder `cd client` and run `npm install` again this time for the front end
* Get back to the main folder `cd ..` and run `npm run dev`. This should start both the server and the front end app concurrently and your app should be available at `http://localhost:3000`


## Features
- Provides a list of all wines in the database
- Search functionality that instantly filters the wine list based on Lot Code & Description
- Each Wine in the list Opens a Wine Details page upon click
- Wine Detail Page provides all the information on the wine including the breakdown of components by year, variety, region, year & variety
- Designed to be Responsive for mobile & tablets


## Technology
### FrontEnd
- ReactJs with React Hooks for State management
- CSS3 for styling
- Axios for HTTP requests
### BackEnd
* Connects to a NodeJS API
* ExpressJs used as a Server
* NoSQL Database MongoDB used for datastore
* 6 API Endpoints that provides 
  * `/wine` - List of all Wines
  * `/wine/:id` - Details of a given wine 
  * `/wine/:id/year` - Year BreakDown for a given wine 
  * `/wine/:id/variety` - Variety BreakDown for a given wine 
  * `/wine/:id/region` - Region BreakDown for a given wine 
  * `/wine/:id/yearvariety` - Year & Variety BreakDown for a given wine 

