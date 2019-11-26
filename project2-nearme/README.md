# Project 2: NearMePedia

The focus of this project is to practice three more advanced mobile topics:
- Interacting with web services
- Using Expo APIs such as sensors
- Using state management libraries and persistence

Wikimedia (the organization that runs Wikipedia and other sites) provides a REST API to access their sites, including wikipedia. In particular, it is possible to search for Wikipedia articles near a specific location. For instance, the list of articles that are near Piazza Domenicani, ordered by distance is [here](https://en.wikipedia.org/wiki/Special:Nearby#/coord/46.49782636201107,11.352520870004525).

Wouldn't it be nice to have a mobile app that allows you to look at these? Fortunately, the MediaWiki API allows you to access this functionality, through the [Geosearch API endpoint](https://www.mediawiki.org/wiki/API:Geosearch).

## Application Functionality
Therefore, the objective of this project is to develop a mobile application that uses the mobile phone's location to display articles on places close to the current location. More specifically:

- The application has a screen (**screen A**) that, given a start location, displays a list of the closest Wikipedia articles near that location, with their distances to the location start location. Tapping on the articles should open the web browser to see them. 
- The application has a **persistent** (persistent accross several uses of the application) list of latitude/longitude coordinates of interest. These locations are displayed on another screen (**screen B**): tapping on one of these launches the screen A with the selected location as the start location. The locations are not displayed as raw numbers. Rather, the closest address to that location is displayed, using the reverse geocoding API.
- From screen B, it is also possible to select the current location (where the mobile phone physically is), and use this location to navigate to screen A.
- From screen B, one can also add a new location based on its address (using reverse geocoding).
- On screen A, it is possible to save articles of interest to a reading list. This reading list is accessible on **screen C**, where all the articles in the reading list are shown, with their distance to the current location. This reading list should be **persistent** accross several usages of the application.

For persistence, you are free to choose any state management library in the [React state museum](https://github.com/GantMan/ReactStateMuseum) that you like. We discussed the state management libraries in [lecture 12](../lec12-state). Note that Unstated is the simplest and most consistent with React, but if you are ambitious, feel free to use MobX-State-Tree or Redux.

## Application Style
Note: while the first project placed more emphasis on functionality than style, **grading style will be more important in this project**. Projects that are functionally complete but that have issues such as:
- large state
- not enough components
- navigation, style, or state management embedded in many components
- other style issue mentioned in the class and the notes

For this project, I will have harsher penalties for these styles issues than for the first project.

## Extras for group projects

It is possible to do this project in groups of 2 or 3. In this case, additional features from the list below should be added:
- If you are doing the project in pairs, you must choose two more features from this list. 
- If you are doing this project as a three person team, you must implement four more features from this list. 
- Larger teams than three people are not allowed.

The additional features are:
- **Localization**: An additional screen is added, in which the language and the wikipedia server to query can be selected. All the UI is translated with the Localization expo API to the relevant language. Unless specified otherwise by the user, selecting a language automatically selects the most relevant wikipedia server. The language and server setting should persist. The previous example looks like [this](https://it.wikipedia.org/wiki/Speciale:NelleVicinanze#/coord/46.49782636201107,11.352520870004525) on the Italian Wikipedia server.
- **Map view**: An additional screen is added, that shows the same information as the list, but on a map of the area, with location markers that contains a description of the article, and that allow to navigate to the article.
- **Compass**: For article in a list, display a "mini compass" that uses the device's location, the article's location, and the device's orientation to show the direction in which to go in order to arrive at the location of the article item.
- **Match the picture**: the article list shows the main picture of the wikipedia page as a thumbnail. Further, the app allows to take a picture with the mobile phone's camera, and displays it right next to the original thumbnail. The intent is to allow a "game" where one should take a picture as similar as possible to the original one. These pictures should persist.
