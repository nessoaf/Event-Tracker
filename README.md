# Event Finder

### Purpose
  Deliver an event tracking web app that allows users to aggregate a collection of favorited events onto their own personal calendar and view detailed information for any chosen event.

### Problem
  Trouble keeping track of your calendar? Juggling a lot of events? Need a simple way of keeping track of your schedule?

### Solution
  - Events anywhere and everywhere
  - Register with Event Calendar and save the ones that pique your interest
  - Use Mapbox to find the address of your event

## MVP
### Current User Experience
- [X] Calendar page
  - [ ] Each day populates with events (from an API)
  - [ ] Clicking on a day will show all events for that day (which can be favorited)
- [X] Profile page 
  - [X] Name
  - [X] Email
  - Favorited events / amount(counter)
  - Profile pic
  - [X] Address
- [ ] Favorite page
- [ ] Search Bar functionality
  - Location
  - Dates
  - types

## Stretch Goal
- Mobile friendly
  - favorite page be more vertical 
- Tracks age and Date of Birth for alerts
- Click on a venue
  - once clicked load venues calendar
- Map Box 
  - Venue Locations for events
- Check age for finding events

### Team Members(daily/Items we want to get done)
    Thomas - Front-end css/etc
        - [X]  D1 CSS
        - [X]  D2 CSS
        - [X]  D3 React component review, boostrap exploration
        - [X]  D4 Check in deployment
        - [ ]  D5
        - [ ]  D6
    Louis - Back-end setup dev
        - [X]  D1 DB start up
        - [X]  D2 DB set up
        - [X]  D3 DB routing
        - [X]  D4 Correcting Back end routes/ tested backend routes - added a anlysis /write up of project
        - [ ]  D5
        - [ ]  D6
    Jimmy - Front-end design/routing
        - [X]  D1 Initial planning for front-end
        - [X]  D2 Touch base with team + decompress Friday
        - [X]  D3 Scaffolding and CSS foundation laid
        - [X]  D4 Profile edits 
        - [ ]  D5
        - [ ]  D6
    Nesso - Bouncer(help where needed)
        - [X]  D1 Help as avaliable
        - [X]  D2 Help as avaliable
        - [X]  D3 Help as avaliable
        - [X]  D4 Enabled auth
        - [ ]  D5 Debugged auth
        - [ ]  D6
# Issues - Anything that is taking some time and should be noted!
- With auth being a broken item as of the weekend we were going to have to avoid it until monday and then throw it into the starter code
- Jimmy discovered early on that the calendar was going to be in its self a challenge
  - We exchanged some messages toward that regard
- 
# Meetups (Scheduled Meeting times/Might not be used)
- [X] Meeting 1 7/23
  - Discussion of implementation of the application
  - Basic field to populate the database 
  - General discussion
    - Set the first 2 days of work to designate jobs as well as who may be helping
      - Git master branch was updated from Jimmy and Nesso 

- [X] Meeting 2 7/24
  - After Auth Class
    - Went over and discussed minute styling discussing dropdown menus etc
  - Made a repo for the back end to allow Louis to have some starter to alter 
  - Adjusted index.js and app.js to better follow todays lesson 
    - hopefully will be adjusted based on group knowledge!

- [X] Meeting 3 7/25
-  Saturday
 - Edited some css
 - Discussed some planning 
 - delegated more tasks 
 - lowered more expectations 
- Finally got solid footing to begin
- did actual beginning

- [X] Meeting 4 7 / 29
Discussed implimentation with api to calendar


- [X] Meeting 5 7/30 Meeting Milcah and nick
Refacroting - 
  the ability to make things more efficient
Need to store the id from eventful to the Favorites DB
  using that ID from the F DB
    we can amke an axios call to retunr the json obj that has the data
Sum - 
we just need the eventful id stores 


# Wireframes

## Landing Page
![](/public/wireframe/Landing-Page-Wireframe.png)
## Main Calendar Page
![](/public/wireframe/Main-Page-Wireframe.png)
## Event Page
![](/public/wireframe/Event-Page-Wireframe.png)
## User Profile Page
![](/public/wireframe/Profile-Page-Wireframe.png)
## Users Favorites Page
![](/public/wireframe/Favorites-Page-Wireframe.png)

## ERD
https://drive.google.com/file/d/1rdZQrbXQxvStXyV9P8d1gnk8CbRNvxCt/view?usp=sharing

## Pitch Deck
 https://docs.google.com/presentation/d/12pGAecJtmeS1GFUZcL304D9aAapzU_ma3j8h-fevh7k/edit#slide=id.gc6f80d1ff_0_0

# Back End README.md from Louis
[Louis' HERE](./backend/README.md)

Nesso's meeting with Milcah - 
- Peer programming - one coder shows screen the other go along and give suggestions(Acts like a real life work enviroment)
  - helps with balancing weaknesses 
  - helps pull strengths
- Try to go through each line of code to reitterate everything
  - attmempt to refactor after 

- Check documentation for best practices 



Fav schema should reference events scheime
  event:[( type: schema.typess.objectid, ref: 'Event)]