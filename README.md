# Theater layout vizualisation

This application allows to visualize the seat layout of a theater as well as the placement of different group of person.
It takes two inputs: 
* layout.json: the actual layout of the room with the number of section ,rows, seats
* groups.json: the structure that define where every group of pepole seat in the room

Make sure you put the two inputs in the assets dir before launching the application. 


## Explication

When the application launches, the Theater view mounts and transforms the basic structure composed of arrays into a structure composed only of objects.
This allows me to modify and browse the structure more easily and so can dispatch the data to different components easily.

In the createTheaterLayoutStructure function, as I iterate through the layout structure, I associate a randomly calculated color with the different ranks available.

Once my new layout structure is generated, I populate the layout with the groups.json data and I generate the color legend for groups and ranks.
This treatment happens in the populateTheaterWithSample function.
This function iterate over the differents group of people and create for each group, a unique random color, and populate the seat in the layout theater with the groupId and the groupColor.


## Performance && limitation

To test the performance of this application, I provide a tool which create a parametrisable layout.json & groups.json.

To use the performance tool, open the index.js in the utils directory and set yours data configuration.

Default configuration: 
```
const nbRanks = 5;
const nbSections = 10;
const rows = {lower: 40, upper: 50};
const seats = {lower: 100, upper: 150};
```
This configuration creates a theater layout between 40 000 and 75 000 seats with 5 differents ranks.
⚠️ Don't try to create enormous layouts...it can be slow to process ⚠️

To run the script:
```
node index.js
```
## Project setup
```
npm install
```

## Run the project
```
npm run serve
```

## Run the unit tests
```
npm run test:unit
```
