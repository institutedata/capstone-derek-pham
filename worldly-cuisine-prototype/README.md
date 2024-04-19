# BiteMap 

## Table of Contents
- [BiteMap](#bitemap)
- [Background](#background)
- [Timeframe](#timeframe)
- [Site](#site)
  - [Landing Page](#landing-page)
- [Usage](#usage)
  - [User Flow](#user-flow)
  - [Forking Repository](#forking-repository)
- [Known Issues](#known-issues)
- [Technology & Structure](#technology--structure)
  - [Frontend](#frontend)
  - [Backend](#backend)
  - [Database Structure](#database-structure)
- [Future Work](#future-work)


## Background

Sparked from a small curiosity and a simple idea, this mini-project, "BiteMap," is a interactive platform that allows food enthusiasts and cultural explorers to dive into the rich diversity of global cuisines. With BiteMap, you can track and discover dishes from all over the world.

### Overview and Goals
The goal behind the project is to essentially allow users to test their food knowledge by naming as many different foods as they can. The webapp can then provide the location of origin for every food name as well as track them and display various visuals that represent the users data. The intended incentive is to allow users to understand the extent of their culinary, geographic and cultural knowledge as well as promoting self-awareness and providing motivation to explore and learn about new uncharted knowledge.

## Timeframe
```mermaid
gantt
    title A Gantt Diagram for WebApp Development
    dateFormat YYYY-MM-DD    
    section Project Definition
        Define project scope and goals            :des1, 2024-01-28, 1d
        Research and Concept Building             : des2, after des1, 1d
        
    section Initial Development       
        (Backend) Research Wikipedia API and data sources                   :a2, 2024-01-29, 2d
        Backend MVP Prototyping                   :2024-01-30, 1d
        (Frontend) Research GoogleMaps API                  :a3, after a2, 2d
        Frontend MVP Prototyping                  :a4, 2024-02-01, 1d
        
    section Refinement Phase
        Backend Rework with Express.js, Data handling & persistance            :a4, after a3, 8d
        Additional Frontend Development with Graphs and Flags          :a4, 2024-02-04, 6d
        Initial Product Presentation              :crit, 2024-02-10, 1d

    section Backend Redevelopment
        Research and Database planning (MongoDB): b1, 2024-02-11, 1d
        Rewriting Backend to fit MVC structure : b2, after b1, 15d
        Implementing database and testing: b3, 2024-02-26, 5d
        Substituting GoogleMaps for MapBox: b4, 2024-03-01, 2d
        Further development of map data interactions and testing: b5, 2024-03-03, 4d
        Product Presentation #2: crit, b5, 2024-03-07, 1d

    section Frontend Redevelopment
        Research for libraries and feature planning: c1, 2024-03-08, 3d
        Rewriting Frontend to fit React Conventional structure: c2, 2024-03-10, 16d
        Implementing new libraries and testing: c3, 2024-03-16, 7d
        Updating visuals and Reponsitivity: c3, 2024-03-22, 4d
        Product Presentation #3: crit, c5, 2024-03-26, 1d

    section Second Refinement Phase and Deployment
        Bug-fixing code (Frontend & Backend): d1, 2024-03-27, 7d
        Database testing and building: d2, 2024-04-01, 3d
        QoL changes/features and small UI updates: d2, 2024-04-03, 3d
        Documentation: d2, 2024-04-05, 1d
        Final Product Presentation: crit, c5, 2024-04-06, 1d

```

## Site

### Landing Page

![Landing Page](landing-page.png)

The top red component contains the title and the links to two pages. Currently, the "Quiz" page is incomplete.

The orange form is the main component that the user will interact with in terms of input. A food name can be inputted into the form and when submitted the relevant will be displayed under the form and the map component to the right of it will update and display its location.

An "Add to list" button will then display, providing users the option to add food names to the green list component and this acts as storage for the users data. The yellow progress bar component, purple stat component, bar-chart component and map component will all update and change to reflect the current state of the data that is stored inside the list component.

## Usage
As briefly mentioned previously, users submit a food name and is met with returned information. The form component on submission sends the input to the backend which will perform a check on the project's secondary database. If that database has the information it will send it back to the frontend and if not it will call on external APIs for information and construct a new data object which is sent back to the frontend and a copy is stored in the secondary database for future reference.

After receiving information from the backend, the frontend will display the information. This includes the location of origin of the food, the flag of said location, a small description, a link to its wikipedia article and its location on the map component adjacent to the form component. The user now has the option to add the food name to the list component. If the list component is updated with the addition or removal of a food name, five other components that rely on this food list data will also update accordingly.

### User flow
```mermaid
flowchart TD
    A[User] --> B(Form component)
    B --> |Enter and submit a food dish name| search([Search])
    search --> |Sends request to backend server| C[Server]
    C --> D[Is the food name already present in foodDataRecords database?]
    D --> Y1([Yes])
    D --> N1([No])
    Y1 --> |Return old information| display([Display])
    N1 --> |Construct new data object| API[API]
    API --> |Return new information| display
    display --> |Display data| B

    B --> add[Add to list?]
    add --> Y2([Yes])
    add --> N2([No])
    Y2 --> |Update| list[List Component]
    Y2 --> |Update| barChart[BarChart Component]
    Y2 --> |Update| mapBox[MapBox Component]
    Y2 --> |Update| progressBar[ProgressBar Component]
    Y2 --> |Update| foodStat[FoodStat Component]
```
### Forking Repository
1. Clone repository
2. Run 'npm install' in root directory. This should install 'npm concurrently' in order to run the backend and frontend at the same time
3. Run 'npm install' in the backend and frontend directories. This should install relevant libraries as listed below in the [Technology & Structure](#technology--structure) section
4. Run 'npm start' from root directory

### Known issues

Over 200 test cases have been run with the search algorithm and certain scenarios have been recorded for due updates.
| UNFIXED |
|--------------|
| Multiple countries may be found after 'phrase' is identified: https://en.wikipedia.org/wiki/Fairy_bread , https://en.wikipedia.org/wiki/Hamburger , https://en.wikipedia.org/wiki/Chili_con_carne , https://en.wikipedia.org/wiki/Hamburger , https://en.wikipedia.org/wiki/Fajita |
| Origins may not be country specific and be a larger inclusive region: https://en.wikipedia.org/wiki/Biryani , https://en.wikipedia.org/wiki/Shawarma |
| Origins may reference continents instead of countries: https://en.wikipedia.org/wiki/Jollof_rice , https://en.wikipedia.org/wiki/Flan_(pie) |
| Origins may be a short description instead of country names: https://en.wikipedia.org/wiki/Ceviche |
| Origins may not be country specific and be oddly named instead i.e. an old country that doesn't exist: https://en.wikipedia.org/wiki/Couscous | 
| 'Associated Cuisine' as an included phrase has not been implemented yet: https://en.wikipedia.org/wiki/Pavlova_(dessert) , https://en.wikipedia.org/wiki/Ikan_bakar |
| The algorithm returns the first matched country and is susceptible to alphabetical bias: https://en.wikipedia.org/wiki/Cannoli , https://en.wikipedia.org/wiki/Green_papaya_salad , https://en.wikipedia.org/wiki/Cr%C3%A8me_br%C3%BBl%C3%A9e , https://en.wikipedia.org/wiki/Mango_pudding , https://en.wikipedia.org/wiki/Clambake , https://en.wikipedia.org/wiki/Char_kway_teow , https://en.wikipedia.org/wiki/Bulgogi |
| United States may be referred to as 'US' instead: https://en.wikipedia.org/wiki/Vichyssoise |
| A list of 'regional variants' may be included and list a large amount of countries: https://en.wikipedia.org/wiki/Jalebi |
| Redirecting may not be enough for certain food items as they might have a page with a large amount of possible links |


## Technology & Structure 

```mermaid
flowchart TD
    A[User] --> B(Frontend)
    B -->|Backend| C{Server}
    C --> D[(Database)]
    C --> F[Services]
    C --> localdata[
        - countries.geojson
        - countriesList.js
        ]

    B -.-|Dependencies| BNote[
        - Vite + React
        - react-konva
        - tsparticles
        - flag-icons
        - MapBox
        - Chart.js
    ]

    D -.- E[MongoDB Atlas]

    F -.- G[
        - 'mongodb' library
        - Wikimedia API
        - MapBox API
    ]
```

### Frontend

- [React](https://react.dev/) - React serves as the core library in building user interface 
- [react-konva](https://konvajs.org/docs/react/Intro.html) - Used to build the progress bar component
- [tsParticles](https://particles.js.org/) - Used to create the animated background
- [flag-icons](https://www.npmjs.com/package/flag-icons) - CSS library used to render flags using ISO 3166-1-alpha-2 codes
- [MapBox](https://www.mapbox.com/) - Used to create MapBox component as well as retrieve geolocation data
- [Chart.js](https://www.chartjs.org/) - Used to visualize data

### Backend

- [countries.geojson](https://github.com/datasets/geo-countries) - Pulled from public github repo and rendered with MapBox
- [mongodb](https://gist.github.com/kalinchernev/486393efcca01623b18d) - Pulled from github and used as reference point for country matching in algorithm
- [Wikimedia API](https://api.wikimedia.org/wiki/Main_Page) - Main body of algorithm used to create food data objects
- [MapBox Api](https://docs.mapbox.com/api/overview/) - Usage in backend involves obtaining coordinate data from country names

#### Database Structure
```mermaid
erDiagram
foodData ||--o{ foodDataRecord : "saves a copy into"
    foodData {
        string id
        string name
        string origin
        array coords
        string thumbnailURL
        string foodDescription
        string articleURL
        string isoCode
    }
    foodDataRecord {
        string id
        string name
        string origin
        array coords
        string thumbnailURL
        string foodDescription
        string articleURL
        string isoCode
    }

```

## Future Work
As BiteMap continues to evolve, we have several enhancements and new features planned to enrich the platform and provide a more comprehensive experience. These include:

 - Implementing a taste profile in the form of a radar chart (sweet, sour, salty, bitter, umami)
 - Incorporating multi-region data
 - A new quiz mode
 - Implementing user profiles so people can save their data